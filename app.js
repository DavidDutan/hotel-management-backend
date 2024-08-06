const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const sequelize = require('./config/config');
const Guest = require('./models/Guest');
const Room = require('./models/Room');
const AuditLog = require('./models/AuditLog');

const app = express();
app.use(express.json());


app.use(cors()); 


sequelize.sync().then(() => console.log('Database synced'));


app.post('/register', async (req, res) => {
    try {
        const { Name, Identification, RoomAssigned, CheckIn } = req.body;
        const room = await Room.findByPk(RoomAssigned);
        if (room.IsOccupied) {
            return res.status(400).json({ message: 'Room is already occupied' });
        }

        const guest = await Guest.create({ Name, Identification, RoomAssigned, CheckIn });
        room.IsOccupied = true;
        await room.save();

        await AuditLog.create({ 
            TableName: 'Guests', 
            Operation: 'INSERT', 
            NewValue: JSON.stringify(guest.toJSON()) 
        });

        res.status(201).json(guest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para visualizar datos de huéspedes
app.get('/guests', async (req, res) => {
    try {
        const guests = await Guest.findAll();
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para registrar la salida del huésped
app.post('/checkout', async (req, res) => {
    try {
        const { Id, CheckOut } = req.body;
        const guest = await Guest.findByPk(Id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }

        const room = await Room.findByPk(guest.RoomAssigned);
        guest.CheckOut = CheckOut;
        room.IsOccupied = false;

        await guest.save();
        await room.save();

        await AuditLog.create({ 
            TableName: 'Guests', 
            Operation: 'UPDATE', 
            OldValue: JSON.stringify(guest.toJSON()), 
            NewValue: JSON.stringify({ ...guest.toJSON(), CheckOut }) 
        });

        res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para ver auditoría
app.get('/audit', async (req, res) => {
    try {
        const logs = await AuditLog.findAll();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
