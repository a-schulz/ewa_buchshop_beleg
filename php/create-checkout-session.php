<?php
header("Content-Type: text/html");
header("Access-Control-Allow-Origin: ");

// Read the HTTP method and request data
$httpMethod = $_SERVER["REQUEST_METHOD"];

// Set up the HTTP response code and message
$responseCode = 200;
$responseMessage = "OK";
http_response_code($responseCode);
$data = array();

// Handle the request based on the HTTP method
switch ($httpMethod) {
    case "POST":
        foreach (array_keys($_POST, true) as $element) {
            $jsonElement = json_decode($_POST[$element], true);
            if (isset($jsonElement['price_data']) && isset($jsonElement['quantity'])) {
                $priceData = $jsonElement['price_data'];
                $quantity = $jsonElement['quantity'];

                $data[] = array(
                    'price_data' => array(
                        'currency' => $priceData['currency'],
                        'unit_amount' => $priceData['unit_amount'],
                        'product_data' => array(
                            'name' => $priceData['product_data']['name'],
                            'description' => $priceData['product_data']['description'],
                            'images' => $priceData['product_data']['images'],
                        ),
                    ),
                    'quantity' => $quantity,
                );
            }
        }
        break;
    default:
        break;
}

require('stripe-php-master/init.php');

$public_key_for_js = "1"; // Definition einer Variable für den public key - Verwendung ganz unten in JS

$live = 14;

// #################################################################
// Definition der Checkout-Account-Keys
if ($live == 1) {
    // Secret Key des Grosshändlers - bitte so lassen !!!
    \Stripe\Stripe::setApiKey('sk_test_cFnCai0Ye9NM8Tn9CMo6k0fn00P0R9pt9u');

    $public_key_for_js = "pk_test_aLcPqdtG2FDzxPWu5N9OBNOs00Yt0nKnhS";  //  PK Großhändler - So lassen !!!!
} else {
    \Stripe\Stripe::setApiKey('sk_test_51MMtfIGoYS59ke4mKzPA9hWc0HNinE0uPqvTvngbsUY6COcjmnncmSbGgb6BsZt86qjrGoIePGbbOJTmtUCe8TKZ00U6uEYHiF');

    $public_key_for_js = "pk_test_51MMtfIGoYS59ke4mXUq7cBQWTZ6onr6q9UFHeGUQ6BDSXKJrEKusnUukdcIq3ApW7L49xeqVRE6B927aFf38t8xT00VcTKTGv3";  // PK  G00
}
// #################################################################

try {
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [$data],
        'mode' => 'payment',
        'success_url' => 'https://ivm108.informatik.htw-dresden.de/ewa/g14/' . 'success.php?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => 'https://ivm108.informatik.htw-dresden.de/ewa/g14/' . 'cancel.php?session_id={CHECKOUT_SESSION_ID}',
    ]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    echo "Error in Session::create()" . $e;
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body>

<h1>Bookstore</h1>

Sie werden zum Stripe-Checkout weitergeleitet....
<?php // echo "mit PK=" . $public_key_for_js
?>
<script>
    var stripe = Stripe('<?php echo $public_key_for_js ?>'); // Nichts ändern ! Public key oben definiert !!!
    // Hier stand vorher der public key des Test-Accounts G00
    stripe.redirectToCheckout({
        sessionId: '<?php echo $session['id']; ?>'
    }).then(function (result) {
    });
</script>

</body>
</html>
