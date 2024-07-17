<?php
include 'db.php';

// Verificar si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consultar el usuario en la base de datos
    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = $conn->query($sql);

    // Verificar si el usuario existe
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verificar la contraseña
        if (password_verify($password, $row['password'])) {
            // Enviar información completa del usuario
            echo json_encode([
                'status' => 'success',
                'user' => [
                    'nombre_completo' => $row['nombre_completo'],
                    'apodo' => $row['apodo'],
                    'email' => $row['email'],
                    'peso' => $row['peso'],
                    'altura' => $row['altura']
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
    }

    // Cerrar la conexión
    $conn->close();
}
?>
