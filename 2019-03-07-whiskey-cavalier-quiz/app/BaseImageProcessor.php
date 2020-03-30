<?php
namespace wc;


abstract class BaseImageProcessor
{
    /** @var string */
    private $template;

    /**
     * ImageProcessor constructor.
     * @param string $template
     */
    public function __construct (string $template)
    {
        $this->template = $template;
    }


    public function write(string $firstname, string $lastname, string $codename, string $result): void
    {
        $image = imagecreatefrompng($this->template);

        imagealphablending($image, true);
        imagesavealpha($image, true);

        $color = imagecolorallocate($image, 59, 60, 152);

        $font = dirname(__DIR__) . '/src/fonts/OpenSans-Bold.ttf';

        $this->print($image, $color, $font, $firstname, $lastname, $codename);

        imagepng($image, $result);
        imagedestroy($image);
    }

    abstract protected function print($image, $color, $font, string $firstname, string $lastname, string $codename): void;
}