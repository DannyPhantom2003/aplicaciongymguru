<?php
include 'db.php';

// Verificar si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_completo = $_POST['nombre_completo'];
    $apodo = $_POST['apodo'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $peso = $_POST['peso'];
    $altura = $_POST['altura'];

    // Insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuarios (nombre_completo, apodo, email, password, peso, altura) VALUES ('$nombre_completo', '$apodo', '$email', '$password', '$peso', '$altura')";

    // Verificar si la inserción fue exitosa
    if ($conn->query($sql) === TRUE) {
        echo "Registro exitoso";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>
