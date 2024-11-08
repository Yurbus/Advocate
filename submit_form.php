<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['name']) && isset($data['phone']) && isset($data['policy'])) {
        $name = htmlspecialchars($data['name']);
        $phone = htmlspecialchars($data['phone']);
        $question = isset($data['question']) ? htmlspecialchars($data['question']) : '';

        // Укажите email получателя
        $to = "frankins636@gmail.com"; // Замените на нужный email
        $subject = "Новая заявка с формы сайта";
        
        // Текст письма
        $message = "Имя: $name\n";
        $message .= "Телефон: $phone\n";
        $message .= "Вопрос: $question\n";

        // Заголовки письма
        $headers = "From: no-reply@yourwebsite.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Отправка email
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Форма успешно отправлена."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Не удалось отправить письмо. Попробуйте позже."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Пожалуйста, заполните все обязательные поля."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Неправильный метод запроса."]);
}
?>
