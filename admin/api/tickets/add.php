<?php

include_once "../../api/config/database.php";
$database = new Database();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->adminKey)) {
    if ($database->adminKey == $data->adminKey) {
        $conn = $database->getConnection();
        $ticketCode = generateTicketCode();

        $query = "INSERT INTO codes (code, status) VALUES (:code, 'active')";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":code", $ticketCode);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Билет успешно создан.", "code" => $ticketCode), JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Не удалось создать билет."), JSON_UNESCAPED_UNICODE);
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Неверный ключ администратора."), JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Отсутствует ключ администратора."), JSON_UNESCAPED_UNICODE);
}

function generateTicketCode() {
    $min = 100000;
    $max = 999999;
    return strval(mt_rand($min, $max));
}
?>
