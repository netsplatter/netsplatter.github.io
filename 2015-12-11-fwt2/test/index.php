<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>vasPLUS Programming Blog - Contact Form with Captcha using Ajax, Jquery and PHP</title>




<!-- Required header files -->
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery_1.5.2.js"></script>
<script type="text/javascript" src="js/vpb_contact_form.js"></script>




</head>
<body>

<div style=" font-family:Verdana, Geneva, sans-serif; font-size:24px;" align="center">Contact Form with Captcha using Ajax, Jquery and PHP</div><br clear="all" />
<center>














<!-- Code Begins Here -->
<div class="vasplus_programming_blog_wrapper" align="left">
<center>
<div style="font-family:Verdana, Geneva, sans-serif; font-size:16px; float:left; width:120px; padding-left:10px;" align="left">Contact Form</div>
<div style="font-family:Verdana, Geneva, sans-serif; font-size:11px; float:left; padding-top:4px;" align="left">Please complete the form below to reach us...</div><br clear="all" /><br clear="all" />

<div style="width:430px; font-family:Verdana, Geneva, sans-serif; font-size:12px;padding:10px;" align="left">

<div style="width:100px;padding-top:10px;float:left;font-family:Verdana, Geneva, sans-serif; font-size:11px;" align="left">Your Fullname:</div>
<div style="width:300px; float:left;" align="left"><input type="text" id="fullname" name="fullname" value="" class="vpb_input_fields"></div><br clear="all"><br clear="all">

<div style="width:100px;padding-top:10px;float:left;font-family:Verdana, Geneva, sans-serif; font-size:11px;" align="left">Email Address:</div>
<div style="width:300px; float:left;" align="left"><input type="text" id="email" name="email" value="" class="vpb_input_fields"></div><br clear="all"><br clear="all">

<div style="width:100px;padding-top:10px;float:left;font-family:Verdana, Geneva, sans-serif; font-size:11px;" align="left">Phone Number:</div>
<div style="width:300px; float:left;" align="left"><input type="text" id="phone" name="phone" value="" class="vpb_input_fields"></div><br clear="all"><br clear="all">

<div style="width:100px;padding-top:10px;float:left;font-family:Verdana, Geneva, sans-serif; font-size:11px;" align="left">Email Subject:</div>
<div style="width:300px; float:left;" align="left"><input type="text" id="subject" name="subject" value="" class="vpb_input_fields"></div><br clear="all"><br clear="all">

<div style="width:100px;padding-top:10px;float:left;font-family:Verdana, Geneva, sans-serif; font-size:11px;" align="left">Your Message:</div>
<div style="width:300px; float:left;" align="left"><textarea id="message" name="message" style="width:280px; height:80px; padding:10px;" class="vpb_input_fields"></textarea></div><br clear="all"><br clear="all">

<div style="width:100px;padding-top:10px;float:left;font-family:Verdana, Geneva, sans-serif; font-size:11px;" align="left">Security Code:</div>
<div style="width:300px; float:left;" align="left">
<div class="vpb_captcha_wrappers"><input type="text" id="vpb_captcha_code" name="vpb_captcha_code" style="border-bottom: solid 2px #cbcbcb;" class="vpb_input_fields"></div></div><br clear="all">
<div style="width:100px; float:left;" align="left">&nbsp;</div>
<div style="width:300px; float:left;" align="left"><div class="vpb_captcha_wrapper"><img src="vasplusCaptcha.php?rand=<?php echo rand(); ?>" id='captchaimg' ></div><br clear="all">
<div style=" padding-top:5px;" align="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:11px;">Can't read the above security code? <a class="ccc" href="javascript:void(0);" onClick="vpb_refresh_aptcha();">Refresh</a></font></div>

</div>
<br clear="all"><br clear="all">

<div style="width:420px; float:left;" align="left"></div>
<div style="width:100px; float:left;" align="left">&nbsp;</div>
<div style="width:300px; float:left;" align="left">
<span class="vpb_general_button" onclick="vpb_submit_form();">Submit</span>
</div>
<br clear="all">
<div id="response_brought"></div><!-- This will display the response from the server -->

</div>

</center>
</div>
<!-- Code Ends Here -->














<p style="margin-bottom:200px;">&nbsp;</p>

</center>

</body>
</html>