<!DOCTYPE html>
<html>
<head>
	<title>Contact</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="HandheldFriendly" content="true" />
    <meta name="viewport" content="width=device-width, initial-scale=0, maximum-scale=1" />
	<meta name="apple-mobile-web-app-capable" content="yes" />	
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/slick.css"/>
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
	<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="js/slick.min.js"></script>
	<script type="text/javascript" src="js/vpb_contact_form.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js"></script>
	<!--[if lt IE 9]>
    	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
     	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>

<!-- MAP SETTINGS -->
<script>
  function initialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(25.201139, 55.284485),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);
</script>
<body>

	<!-- PRELOADER -->
    <div id="preloader">
      	<div id="status">&nbsp;</div>
    </div>
    
	<!-- HEADER SECTION -->
	<header>
		<div class="wrapper">
			<a href="#" class="logo">
				<img src="images/main-logo.png" alt="">
			</a>
			<ul class="navbar-nav nav pull-right">
				<li><a href="index.html">Home</a></li>
				<li><a href="products.html">Products</a></li>
				<li><a href="services.html">Services</a></li>
				<li class="active"><a href="contact.php">Contact</a></li>
			</ul>
		</div>
	</header>

	<!-- CONTENT SECTION -->
	<!-- CONTACT-BLOCK -->
	<div class="container-fluid content-container contact-block">
		<div class="wrapper">
			<h2>Contact us</h2>
			<div class="line"><span>&</span></div>
			<div class="content-block clearfix">
				<form action="" id="contact-form">
					<h4>Fill out all required fields to send a Message.</h4>
					<div class="form-group">
						<input type="text" id="fullname" name="fullname" value="" class="form-control" placeholder="Your name">
					</div>
					<div class="form-group">
						<input type="text" id="email" name="email" value="" class="form-control" placeholder="Email address">
					</div>
					<div class="form-group">
						<input type="text" id="subject" name="subject" value="" class="form-control" placeholder="Subject">
					</div>
					<div class="form-group">
						<textarea id="message" name="message" placeholder="What would you like to tell us"></textarea>
					</div>	
					<div class="form-group">
						<input type="text" id="vpb_captcha_code" name="vpb_captcha_code" class="form-control" placeholder="Security code">
					</div>
					<div style="width:300px; float:right;" align="left">
							<div class="vpb_captcha_wrapper"><img src="vasplusCaptcha.php?rand=<?php echo rand(); ?>" id='captchaimg' ></div>
							<div style=" padding-top:5px;" align="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:11px;">Can't read the above security code? <a class="ccc" href="javascript:void(0);" onClick="vpb_refresh_aptcha();">Refresh</a></font></div>
						</div>
					<div class="btn" onclick="vpb_submit_form();"><span>Send Message</span></div>
					<div id="response_brought"></div>
				</form>
				<div class="map-container">
					<div id="map"></div>
					<div class="info-block">
						FUTURE WORK TECH<br>
						[LANDMARK_NAME], [SUB_BUILDING_NUMBER]<br>
						PO Box OFFICE_BOX_NUMBER<br>
						NAME_OF_EMIRATE<br>
						UNITED ARAB EMIRATES
					</div>
				</div>
			</div>				
		</div>
	</div>

	<!-- FOOTER SECTION -->
	<footer>
		<div class="wrapper">
			<span class="pull-left">Ⓒ Future Work Tech 2015, All Rights Reserved</span>
			<span class="pull-right">Website designed by Smartfolks Interactive</span>
		</div>
	</footer>
	<script src="js/bootstrap.min.js"></script>
</body>
</html>