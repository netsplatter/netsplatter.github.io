<?php
header("Content-type: text/html; charset=utf-8");
//**********************************************
	$name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $city = htmlspecialchars($_POST['city']);
    $mail = htmlspecialchars($_POST['mail']);
	//Отправка письма админу о новом комментарии
	$to = "Info@zdengi.ru";//Ваш e-mail адрес
	$mes = "Имя: $name \nНомер телефона: $phone \nГород: $city \nE-mail: $mail";
	$from = "mail@mail.ru";
	$sub = '=?utf-8?B?'.base64_encode('Новое сообщение с Вашего сайта').'?=';
	$headers = "Content-Type: text/plain; charset=utf-8\r\n".'From: '.$from.' ';
	mail($to, $sub, $mes, $headers);
?>