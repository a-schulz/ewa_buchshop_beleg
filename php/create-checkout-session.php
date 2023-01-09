<?php

\Stripe\Stripe::setApiKey('pk_test_51MEBChCLd2iCFZeE7MOMEz6d1sy8hU64isGXFdXYGInUYpmlAd7zkigQfiMCO0neVa58s8VPJyQBC84JYl1BnZ0y00Cb9ZiLOM');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'https://ivm108.informatik.htw-dresden.de/ewa/g14/';

$checkout_session = \Stripe\Checkout\Session::create([
  'line_items' => [[
    # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
    'price' => '{{PRICE_ID}}',
    'quantity' => 1,
  ]],
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '?success=true',
  'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);