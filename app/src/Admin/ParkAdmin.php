<?php

namespace Doggo\Admin;

use Doggo\Model\Park;
use SilverStripe\Admin\ModelAdmin;

class ParkAdmin extends ModelAdmin
{
    private static $managed_models = [
        Park::class,
    ];

    private static $menu_title = 'Parks';

    private static $url_segment = 'parks';
}
