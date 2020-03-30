<?php
namespace wc;


class RightAlignedImageProcessor extends BaseImageProcessor
{
    /** @var int int */
    private $font_size;

    /** @var int */
    private $height1;

    /** @var int */
    private $height2;

    /** @var int */
    private $padding;

    /** @var int */
    private $max_width;

    public function __construct (string $template, int $font_size, int $height1, int $height2, int $padding, int $max_width)
    {
        parent::__construct($template);

        $this->font_size = $font_size;
        $this->height1   = $height1;
        $this->height2   = $height2;
        $this->padding   = $padding;
        $this->max_width = $max_width;
    }

    protected function print ($image, $color, $font, string $firstname, string $lastname, string $codename): void
    {
        if(!$this->printText($image, mb_strtoupper($firstname . ' ' . $lastname), $this->height1, $color, $font, $this->max_width)) {
            $this->printText($image, mb_strtoupper(mb_substr($firstname, 0, 1) . '. ' . $lastname), $this->height1, $color, $font);
        }
        $this->printText($image, mb_strtoupper($codename), $this->height2, $color, $font);
    }


    private function printText($image, string $text, $y, $color, $font, int $max_width = null): bool
    {
        $box = imagettfbbox($this->font_size, 0, $font, $text);

        $width = $box[2] - $box[0];

        if($max_width !== null && $width > $max_width) {
            return false;
        }

        $x = imagesx($image) - $width - $this->padding;

        imagettftext($image, $this->font_size, 0, $x, $y, $color, $font, $text);

        return true;
    }
}