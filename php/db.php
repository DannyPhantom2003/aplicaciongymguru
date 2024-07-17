<?php
// Datos de conexión a la base de datos
$host = "localhost";
$user = "root"; // Nombre de usuario de MySQL
$pass = ""; // Contraseña de MySQL
$dbname = "gymguru"; // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
