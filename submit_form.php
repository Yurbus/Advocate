<?php
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *'); // Если нужно для CORS
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Получение JSON-данных из тела запроса
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
    
        if ($data) {
            $name = htmlspecialchars($data['name']);
            $phone = htmlspecialchars($data['phone']);
            $question = htmlspecialchars($data['question']);
    
            if (isset($data['policy'])) {
                $to = "info@advocate.trainer.dp.ua"; 
                $subject = "Новая заявка с сайта";
                $message = "
                    <h2>Нова заявка</h2>
                    <p><strong>Ім'я:</strong> $name</p>
                    <p><strong>Телефон:</strong> $phone</p>
                    <p><strong>Питання:</strong> $question</p>
                ";
                $headers = "From: info@advocate.trainer.dp.ua\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
                if (mail($to, $subject, $message, $headers)) {
                    echo json_encode(['status' => 'success']);
                } else {
                    echo json_encode(['status' => 'error']);
                }
            } else {
                echo json_encode(['status' => 'policy_not_checked']);
            }
        } else {
            echo json_encode(['status' => 'invalid_data']);
        }
    }
?>

