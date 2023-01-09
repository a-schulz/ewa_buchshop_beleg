<?php

namespace Stripe;

/**
 * Class AccountLink
 *
 * @property string $object
 * @property int $created
 * @property int $expires_at
 * @property string $url
 *
 * @package Checkout
 */
class AccountLink extends ApiResource
{
    const OBJECT_NAME = 'account_link';

    use ApiOperations\Create;
}
