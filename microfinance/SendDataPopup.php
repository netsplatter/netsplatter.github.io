<?php
header("Content-type: text/html; charset=utf-8");
//**********************************************
	$name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
	//Отправка письма админу о новом комментарии
	$to = "Info@zdengi.ru";//Ваш e-mail адрес
	$mes = "Заказ звонка \nИмя: $name \nНомер телефона: $phone";
	$from = "mail@mail.ru";
	$sub = '=?utf-8?B?'.base64_encode('Новое сообщение с Вашего сайта').'?=';
	$headers = "Content-Type: text/plain; charset=utf-8\r\n".'From: '.$from.' ';
	mail($to, $sub, $mes, $headers);
?>