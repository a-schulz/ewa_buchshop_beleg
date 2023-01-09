<?php

namespace Stripe\Exception;

/**
 * IdempotencyException is thrown in cases where an idempotency key was used
 * improperly.
 *
 * @package Checkout\Exception
 */
class IdempotencyException extends ApiErrorException
{
}
