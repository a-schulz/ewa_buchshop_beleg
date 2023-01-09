<?php

namespace Stripe\Reporting;

/**
 * Class ReportType
 *
 * @property string $id
 * @property string $object
 * @property int $data_available_end
 * @property int $data_available_start
 * @property string[]|null $default_columns
 * @property string $name
 * @property int $updated
 * @property int $version
 *
 * @package Checkout\Reporting
 */
class ReportType extends \Stripe\ApiResource
{
    const OBJECT_NAME = 'reporting.report_type';

    use \Stripe\ApiOperations\All;
    use \Stripe\ApiOperations\Retrieve;
}
