<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de Cita</title>
</head>
<body>
    <h1>Confirmación de Cita</h1>
    <p>Hola, {{ $appointment['patient_name'] }}.</p>
    <p>Tu cita ha sido agendada exitosamente para el día {{ $appointment['date'] }} con el Dr. {{ $appointment['doctor_name'] }}.</p>
    <p>Motivo: {{ $appointment['reason'] }}</p>
    <p>Gracias por elegirnos.</p>
</body>
</html>
