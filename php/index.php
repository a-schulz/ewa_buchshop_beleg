<?php
// Set up the database connection
$username = 'g14';
$password = 'gu67mim';
$database = 'g14';

// Create a new connection to the MySQL database
$conn = new mysqli("localhost", $username, $password, $database)
    // if there is an error with the connection, stop the script and display the error
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
http_response_code($responseCode);

// Handle the request based on the HTTP method
switch ($httpMethod) {
        // Handle GET requests
    case "GET":
        // Return a single item if an ID is provided
        // Example: https://ivm108.informatik.htw-dresden.de/ewa/g14/php?id=1
        if (isset($_GET["id"])) {
            $id = $_GET["id"];
            if ($stmt = $conn->prepare("SELECT * FROM buecher WHERE produktid=?")) {
                // Bind the parameter of type int (i) to the query
                $stmt->bind_param("i", $id);
                $stmt->execute();
            } else {
                // Something went wrong
                // Set the response code to 500 (Internal Server Error)
                $responseCode = 500;
                http_response_code($responseCode);
                die(json_encode(["error" => mysqli_error($conn)]));
            }
            $result = $stmt->get_result();
            if (!$result) {
                // Something went wrong
                // Set the response code to 500 (Internal Server Error)
                $responseCode = 500;
                http_response_code($responseCode);
                die(json_encode(["error" => mysqli_error($conn)]));
            }
            // Return the result as JSON
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $responseData = json_encode($rows);
            mysqli_free_result($result);
            mysqli_stmt_close($stmt);
        } else {
            // Return all items if no ID is provided
            $stmt = "SELECT * FROM buecher";
            $result = $conn->query($stmt);
            if (!$result) {
                // Something went wrong
                // Set the response code to 500 (Internal Server Error)
                $responseCode = 500;
                http_response_code($responseCode);
                die(json_encode(["error" => mysqli_error($conn)]));
            }
            // Return the result as JSON
            $rows = array();
            // Fetch all rows as an associative array
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $responseData = json_encode($rows);
        }
        break;
    default:
        break;
}
mysqli_close($conn);
echo $responseData;

/*
// Example to bind prepared statements
// Connect to the database
$conn = new mysqli("localhost", "username", "password", "database");

// Prepare the statement
$stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");

// Bind the parameters
$name = "John Doe";
$email = "john.doe@example.com";
$stmt->bind_param("ss", $name, $email);

// Execute the statement
$stmt->execute();

// Close the statement and connection
$stmt->close();
$conn->close();
*/