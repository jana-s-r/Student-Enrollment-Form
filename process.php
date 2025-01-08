<?php

$conn = new mysqli('localhost', 'root', '', 'studentsForm');

if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['name'])) {
        
        $name = $_POST['name'];
        $age = $_POST['age'];
        $gender = $_POST['gender'];
        $course = $_POST['course'];
        $email = $_POST['email'];

        $stmt = $conn->prepare("INSERT INTO studentsDetails (name, age, gender, course, email) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $age, $gender, $course, $email); 
        $execval = $stmt->execute();

        if ($execval) {
            echo $stmt->insert_id;
        } else {
            echo "Error in registration.";
        }

        $stmt->close();
    } elseif (isset($_POST['id'])) {
        $id = $_POST['id'];

        $stmt = $conn->prepare("DELETE FROM student WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo "Record deleted successfully.";
        } else {
            echo "Error deleting record.";
        }

        $stmt->close();
    }
}

$conn->close();
?>
