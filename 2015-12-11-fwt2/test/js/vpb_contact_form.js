/********************************************************************************************************************
* Contact Form with Captcha using Ajax, Jquery and PHP
* This script is brought to you by Vasplus Programming Blog by whom all copyrights are reserved.
* Website: www.vasplus.info
* Email: vasplusblog@gmail.com or info@vasplus.info
* Please, this script must not be sold and do not remove this information from the top of this page.
*********************************************************************************************************************/


//This function refreshes the security or captcha code when you click on the refresh link at the form
function vpb_refresh_aptcha()
{
	return document.getElementById("vpb_captcha_code").value="",document.getElementById("vpb_captcha_code").focus(),document.images['captchaimg'].src = document.images['captchaimg'].src.substring(0,document.images['captchaimg'].src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
}



//This is the JS function that sends the mail - It is called when you click on the submit button which is in the form
function vpb_submit_form()
{
	//Variable declaration and assignment
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var fullname = $("#fullname").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var subject = $("#subject").val();
	var message = $("#message").val();
	var vpb_captcha_code = $("#vpb_captcha_code").val();
	
	if( fullname == "" ) //Validation against empty field for fullname
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Please enter your fullname in the required field to proceed. Thanks.</div>');
		$("#fullname").focus();
	}
	else if( email == "" ) //Validation against empty field for email address
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Please enter your email address in the required email field to proceed. Thanks.</div>');
		$("#email").focus();
	}
	else if(reg.test(email) == false) //Validation for working email address
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Sorry, your email address is invalid. Please enter a valid email address to proceed. Thanks.</div>');
		$("#email").focus();
	}
	else if( phone == "" ) //Validation against empty field for telephone number
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Please enter your telephone number in the required field to proceed. Thanks.</div>');
		$("#phone").focus();
	}
	else if( subject == "" ) //Validation against empty field for email subject
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Please enter the subject of your message in the required field to proceed. Thanks.</div>');
		$("#subject").focus();
	}
	else if( message == "" ) //Validation against empty field for email message
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Please enter your message in the required message field to proceed. Thanks.</div>');
		$("#message").focus();
	}
	else if( vpb_captcha_code == "" ) //Validation against empty field for security captcha code
	{
		$("#response_brought").html('<br clear="all"><div class="vpb_info" align="left">Please enter the security code in its field to send us your message. Thanks.</div>');
		$("#vpb_captcha_code").focus();
	}
	else
	{
		var dataString = {'fullname':fullname, 'email':email, 'phone':phone, 'subject':subject, 'message':message, 'vpb_captcha_code':vpb_captcha_code, 'submitted':'1'};
		
		//Show loading image
		$("#response_brought").html('<br clear="all"><div align="left" style=" padding-top:6px; margin-left:100px; margin-top:15px;"><font style="font-family:Verdana, Geneva, sans-serif; font-size:12px; color:black;">Please wait</font> <img src="images/loading.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div>');
		
		$.post('vpb_contact_form.php', dataString,  function(response) 
		{
		  //Check to see if the message is sent or not
			var response_brought = response.indexOf('Congrats');
			if( response_brought != -1 )
			{
				//Clear all form fields on success
				$("#fullname").val('');
				$("#email").val('');
				$("#phone").val('');
				$("#subject").val('');
				$("#message").val('');
				$("#vpb_captcha_code").val('');
				
				//Display success message if the message is sent
				$("#response_brought").html(response);
				vpb_refresh_aptcha();
				
				//Remove the success message also after a while of displaying the message to the user
				setTimeout(function() {
					$("#response_brought").html('');
				},10000);
			}  
			else  
			{
				//Display error message is the message is not sent
				 $("#response_brought").html(response);
			}
		});
	}
}