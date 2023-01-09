<?php

namespace Stripe\Exception;

/**
 * RateLimitException is thrown in cases where an account is putting too much
 * load on Checkout's API servers (usually by performing too many requests).
 * Please back off on request rate.
 *
 * @package Checkout\Exception
 */
class RateLimitException extends InvalidRequestException
{
}
