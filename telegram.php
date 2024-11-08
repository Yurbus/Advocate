/*Скрипт положить в function.php в теме WP*/

add_action("wpcf7_mail_sent", "wpcf7_do_something");
	function wpcf7_do_something($cf7) {
		$wpcf = WPCF7_ContactForm::get_current();
		//Здесь скрипт отправки в телеграмм.
		$name = $_POST['your-name'];
		$phone = $_POST['your-phone'];
		$email = $_POST['your-mail'];
		$massage = $_POST['massage'];
		$token = "878137863:AAETXKS8myXMSTsP7rxnQK_Hz52ckd5Ljos";
		$chat_id = "-380742184";
		$arr = array(
		  'Имя пользователя: ' => $name,
		  'Телефон: ' => $phone,
		  'E-mail: ' => $mail,
		  'Сообщение: ' => $message,
		);

		$txt .= "<b>".$name."</b>".$phone."%0A";

		$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
		if ($sendToTelegram) {
			return $wpcf;
			echo '<p class="success">Спасибо за отправку вашего сообщения!</p>';
		} else {
			echo '<p class="fail"><b>Ошибка. Сообщение не отправлено!</b></p>';
		}
	}