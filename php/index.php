<?php

// Set up the database connection
$username = 'g14';
$password = 'gu67mim';
$database = 'g14';

$conn = new mysqli("localhost", $username, $password, $database)
or die("Keine Verbindung möglich: " . mysql_error());

// Set up the HTTP response headers
// PHP should return JSON data
header("Content-Type: application/json");
// Allow any client to access this API
header("Access-Control-Allow-Origin: *");

// Read the HTTP method and request data
$httpMethod = $_SERVER["REQUEST_METHOD"];

// Set up the HTTP response code and message
$responseCode = 200;
$responseMessage = "OK";
http_response_code($responseCode);

// Handle the request based on the HTTP method
switch ($httpMethod) {
    case "GET":
        // Handle GET requests
        if (isset($_GET["id"])) {
            // Return a single item if an ID is provided
            $id = $_GET["id"];
            if ($stmt = $conn->prepare("SELECT * FROM buecher WHERE produktid=?")) {
                $stmt->bind_param("i", $id);
                $stmt->execute();
            } else {
                $error = $conn->errno . ' ' . $conn->error;
                echo $error;
            }
            $result = $stmt->get_result();
            if (!$result) {
                $responseCode = 500;
                $responseMessage = "Internal Server Error";
                $responseData = json_encode(["error" => mysqli_error($conn)]);
            }
            $rows = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            $responseData = json_encode($rows);
        } else {
            // Return all items if no ID is provided
            $stmt = ("SELECT * FROM buecher");
            $result = mysqli_query($conn, $stmt);
            $rows = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            $responseData = json_encode($rows);
//            echo $responseData;
        }
        break;
    default:
        break;
}
mysqli_close($conn);
echo $responseData;
?>