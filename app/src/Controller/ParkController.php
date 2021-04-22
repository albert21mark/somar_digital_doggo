<?php

namespace Doggo\Controller;

use Doggo\Model\Park;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;

class ParkController extends Controller 
{
    private static $allowed_actions = [
        'index',
    ];

    public function index(HTTPRequest $request) 
    {
        if (!$request->isGET()) {
            return $this->json(['error' => 'Method not allowed'], 405);
        }

        $id = $request->param('ID');

        if (empty($id)) {
            $parks = Park::get()->toArray();
            return $this->json($parks);
        }

        $park = Park::get_by_id($id);

        if (!$park) {
            return $this->json(['error' => 'Park does not exist'], 404);
        }

        return $this->json($park);
    }

    /**
     * @param $data
     * @param int $status
     * @param bool $forceObject
     * @return HTTPResponse
     */
    public function json($data, $status = 200, $forceObject = false)
    {
        $flags = null;

        if ($forceObject) {
            $flags = JSON_FORCE_OBJECT;
        }

        $response = (new HTTPResponse())
            ->setStatusCode($status)
            ->setBody(json_encode($data, $flags))
            ->addHeader('Content-Type', 'application/json');

        return $response;
    }
}