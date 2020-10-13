<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text'];


$mail->isSMTP();
$mail->Host = 'smtp.yandex.ru';                                                                                              // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'alexrud-a@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'ojvZ6tCL'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('zayavka_site@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('alexrud-a@yandex.ru');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = '' . $name . ' оставил заявку, телефон: ' . $phone . ' почта: ' . $email. ' сообщение: ' . $text;
$mail->AltBody = '';

if (!$mail->send()) {
    echo 'Возникла ошибка, попробуйте еще раз';
} else {
    echo 'Спасибо! Мы скоро свяжемся с Вами!';
}
