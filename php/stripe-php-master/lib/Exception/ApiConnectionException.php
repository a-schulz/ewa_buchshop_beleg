<?php

namespace Stripe\Exception;

/**
 * ApiConnection is thrown in the event that the SDK can't connect to Checkout's
 * servers. That can be for a variety of different reasons from a downed
 * network to a bad TLS certificate.
 *
 * @package Checkout\Exception
 */
class ApiConnectionException extends ApiErrorException
{
}
