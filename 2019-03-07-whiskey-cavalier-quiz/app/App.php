<?php
namespace wc;


use http\Exception\InvalidArgumentException;


class App
{
    private $default_route = 'index';

    private function getRoute(): string
    {
        if(!isset($_GET['r'])) {
            return $this->default_route;
        }
        $path = explode('/', ltrim( $_GET['r'], '/'));
        $route = array_shift($path);
        while(null !== $param = array_shift($path)) {
            $_GET[$param] = array_shift($path);
        }
        return $route;
    }

    public function process(): ?Response
    {
        if(isset($_SERVER['HTTP_ORIGIN'])) { //todo remove in prod
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        }

        if(strtolower($_SERVER['REQUEST_METHOD']) === 'options') {
            return null;
        }

        switch ($this->getRoute()) {
            case 'license':
                return $this->processLicense();
            default:
                return $this->processIndex();
                //throw new InvalidArgumentException('Unknown route');
        }
    }

    private function getBody()
    {
        $data = file_get_contents('php://input');

        $data = json_decode($data, true);

        if(JSON_ERROR_NONE !== $error_code = json_last_error()) {
            throw new InvalidArgumentException(json_last_error_msg(), $error_code);
        }

        return $data;
    }

    private function processIndex(): Response
    {
        $hostname = $_SERVER['REQUEST_SCHEME'] . '://' .$_SERVER['HTTP_HOST'];
        $response = new Response();

        $response->ogs['title']       = 'Виски Кавалер';
        $response->ogs['description'] = 'Пройди тест на секретного агента';


        if(strpos($_SERVER['HTTP_USER_AGENT'] ?? '', 'Twitterbot') === 0) {
            $response->ogs['image']       = $hostname.'/licenses/preview_icon_tw.png';
        } else {
            $response->ogs['image']       = $hostname.'/licenses/preview_icon.png';
        }

        if(($firstname = $_GET['firstname'] ?? null) && ($lastname = $_GET['lastname'] ?? null) && ($codename = $_GET['codename'] ?? null)) {

            $response->ogs['description'] = 'Я спецагент '.$codename.', узнай свой позывной здесь.';

            if($from = $_GET['from'] ?? null) {
                $image = $this->generateLicenseFileName($firstname, $lastname, $codename, $from);

                if(!file_exists($this->generateFullpath($image))) {
                    $image = $this->generateLicenseFileName($firstname, $lastname, $codename);
                }
            } else {
                $image = $this->generateLicenseFileName($firstname, $lastname, $codename);
            }

            $response->ogs['image'] = $hostname . $image;
        }


        $response->type = Response::TYPE_INDEX;
        return $response;
    }

    private function generateLicenseFileName(string $firstname, string $lastname, string $codename, ?string $from = null): string
    {
        $data = [$firstname, $lastname, $codename,];
        if($from) {
            $data[] = $from;
        }

        $hash = md5(implode('_', $data));

        $chunk_size = 2;

        $path = '/licenses/' . implode('/', str_split(substr($hash, 0, $chunk_size*2), $chunk_size));

        if(!file_exists($dirPath = $this->generateFullpath($path))) {
            mkdir($dirPath, 0777, true);
        }

        return $path . '/'. $hash . '.png';
    }

    private function generateFullpath(string $filename): string
    {
        return rtrim(dirname(__DIR__), '/').$filename;
    }

    private function processLicense(): Response
    {
        $data = $this->getBody();

        if(null === $firstname = $data['firstname'] ?? null) {
            throw new InvalidArgumentException('Name field is required');
        }

        if(null === $lastname = $data['lastname'] ?? null) {
            throw new InvalidArgumentException('Name field is required');
        }

        $processor = new CodenameProcessor();

        $codename = $processor->generate($firstname, $lastname);

        $data = [
            'codename'    => $codename['codename'],
            'description' => $codename['description'],
        ];

        $processors = [
            ''   => new RightAlignedImageProcessor(dirname(__DIR__).'/src/img/license.png', 20, 362, 402, 98, 500),
            'vk' => new RightAlignedImageProcessor(dirname(__DIR__).'/src/img/license_vk.png', 10, 172, 192, 150, 197),
            'fb' => new RightAlignedImageProcessor(dirname(__DIR__).'/src/img/license_fb.png', 10, 193, 213, 153, 197),
            'tw' => new RightAlignedImageProcessor(dirname(__DIR__).'/src/img/license_tw.png', 10, 207, 230, 150, 197),
        ];

        foreach ($processors as $code => $processor) {

            $filename = $this->generateLicenseFileName($firstname, $lastname, $codename['codename'], $code ? : null);

            $fullpath = $this->generateFullpath($filename);

            if(!file_exists($fullpath)) {
                $processor->write($firstname, $lastname, $codename['codename'], $fullpath);
            }

            $param = 'filename';

            if($code) {
                $param .= '_' . $code;
            }

            $data[$param] = $filename;
        }

        $response = new Response();

        $response->type = Response::TYPE_DATA;

        $response->data = ['success' => true, 'data' => $data];

        return $response;
    }
}