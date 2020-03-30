<?php
namespace wc;


class Response
{
    const TYPE_INDEX = 'index';

    const TYPE_DATA = 'data';

    public $type;

    public $data;

    /** @var array */
    public $ogs = [];
}