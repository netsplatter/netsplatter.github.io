<?php
header("Content-type: text/html; charset=utf-8");
//**********************************************
	$name = htmlspecialchars($_POST['name']);
    $restaurant = htmlspecialchars($_POST['restaurant']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
	//Отправка письма админу о новом комментарии
	$to = "";//Ваш e-mail адрес
	$mess = "Информация от клиента
	\nИмя: $name \nРесторан: $restaurant \nE-mail: $email \nТелефон: $phone";
	$from = "resvisual@mail.ru";
	$sub = '=?utf-8?B?'.base64_encode('Новое сообщение с вашего сайта').'?=';
	$headers = "Content-Type: text/plain; charset=utf-8\r\n".'From: '.$from.' ';
	mail($to, $sub, $mess, $headers);
?>