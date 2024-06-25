<!DOCTYPE html>
<html>
<head>
    <title>Cancelación de Cita</title>
</head>
<body>
    <h1>Cancelación de Cita</h1>
    <p>Hola, {{ $details['patient_name'] }}.</p>
    <p>Tu cita con el doctor {{ $details['doctor_name'] }} el {{ $details['date'] }} ha sido cancelada.</p>
    <p>Razón: {{ $details['reason'] }}</p>
    <p>Gracias por usar nuestro servicio.</p>
</body>
</html>
