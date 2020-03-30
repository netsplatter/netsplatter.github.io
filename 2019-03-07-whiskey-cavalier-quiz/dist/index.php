<?php
include dirname(__DIR__) . '/app/App.php';
include dirname(__DIR__) . '/app/Response.php';
include dirname(__DIR__) . '/app/BaseImageProcessor.php';
include dirname(__DIR__) . '/app/LeftAlignedImageProcessor.php';
include dirname(__DIR__) . '/app/RightAlignedImageProcessor.php';
include dirname(__DIR__) . '/app/CodenameProcessor.php';

$app = new \wc\App();

if(null === $response = $app->process()) {
    return ;
}

if($response->type === \wc\Response::TYPE_DATA) {
    echo json_encode($response->data);
    return;
}

if($response->type === \wc\Response::TYPE_INDEX):
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Виски Кавалер</title>
  <meta name="description" content="Пройди тест на секретного агента">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php foreach ($response->ogs as $og => $value): ?>
      <meta property="og:<?= $og ?>" content="<?= htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?>" />
  <?php endforeach; ?>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="google" content="notranslate" />
  <base href="/">
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-136601008-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-136601008-1');
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KKXP82F');</script>
<!-- End Google Tag Manager -->
<link rel="shortcut icon" href="/favicon.ico"></head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKXP82F" height="0" width="0"
                  style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
  <div id="root"></div>
<script type="text/javascript" src="/bundle.b77e3aaa7370ca0dde5a.js"></script></body>
</html>
<?php endif; ?>