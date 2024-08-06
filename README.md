# hotel-management-backend
Backend para el sistema de gestión de hotel.

## Gestión de Habitaciones

### Asignación de Habitaciones

En nuestro sistema, cada habitación es individual y un huésped puede estar asignado a una sola habitación. Mientras una habitación esté ocupada, no puede ser asignada a otro huésped. Al registrar un nuevo huésped, se verificaria la disponibilidad de la habitación para garantizar que esté libre.

### Manejo de Habitaciones No Disponibles

En el caso de que no haya habitaciones disponibles, proponemos las siguientes soluciones:

1. **Sistema de Reserva de Espera**: Los huéspedes pueden registrarse en una lista de espera para ser notificados cuando una habitación se libere. Esta funcionalidad permite gestionar la demanda en tiempos de alta ocupación.

2. **Opciones Alternativas**:
   - Si hay hoteles asociados cercanos, se puede redirigir al huésped para que reciba alojamiento.
   - Se pueden ofrecer descuentos para estadías futuras como compensación por la falta de disponibilidad inmediata.

Estas soluciones permiten una gestión eficiente de las habitaciones y una experiencia más fluida para los huéspedes.
