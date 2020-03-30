<?php
include __DIR__ . '/app/BaseImageProcessor.php';
include __DIR__ . '/app/LeftAlignedImageProcessor.php';
include __DIR__ . '/app/RightAlignedImageProcessor.php';


$firstname = 'Александр';
$lastname  = 'Иванцевич-Ур';//-Уральский
$codename  = 'Ромовый Всадник';

$processors = [
    ''   => new \wc\RightAlignedImageProcessor(__DIR__.'/src/img/license.png', 20, 362, 402, 98, 500),
    'vk' => new \wc\RightAlignedImageProcessor(__DIR__.'/src/img/license_vk.png', 10, 172, 192, 150, 197),
    'fb' => new \wc\RightAlignedImageProcessor(__DIR__.'/src/img/license_fb.png', 10, 193, 213, 153, 197),
    'tw' => new \wc\RightAlignedImageProcessor(__DIR__.'/src/img/license_tw.png', 10, 207, 230, 150, 197),
];

foreach ($processors as $code => $processor) {

    $filename = ($code ? : 'site').'.png';

    $fullpath = __DIR__ . '/licenses/'.$filename;

    $processor->write($firstname, $lastname, $codename, $fullpath);
}