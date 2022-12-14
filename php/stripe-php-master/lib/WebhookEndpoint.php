<?php

namespace Stripe;

/**
 * Class WebhookEndpoint
 *
 * @property string $id
 * @property string $object
 * @property string|null $api_version
 * @property string|null $application
 * @property int $created
 * @property string[] $enabled_events
 * @property bool $livemode
 * @property string $secret
 * @property string $status
 * @property string $url
 *
 * @package Checkout
 */
class WebhookEndpoint extends ApiResource
{
    const OBJECT_NAME = 'webhook_endpoint';

    use ApiOperations\All;
    use ApiOperations\Create;
    use ApiOperations\Delete;
    use ApiOperations\Retrieve;
    use ApiOperations\Update;
}
