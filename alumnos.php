<?php
$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "test_php";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Insertar un nuevo alumno en la base de datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = $_POST["nombre"];
  $apellido = $_POST["apellido"];

  $sql = "INSERT INTO alumnos (nombre, apellido) VALUES ('$nombre', '$apellido')";
  if ($conn->query($sql) === TRUE) {
    echo "Alumno agregado correctamente";
  } else {
    echo "Error al agregar el alumno: " . $conn->error;
  }
}

// Obtener la lista de alumnos desde la base de datos
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $sql = "SELECT * FROM alumnos";
  $result = $conn->query($sql);
  $alumnos = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $alumnos[] = $row;
    }
  }

  echo json_encode($alumnos);
}

$conn->close();
