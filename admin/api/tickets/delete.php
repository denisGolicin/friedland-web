<?php
include_once "../../api/config/database.php";
$database = new Database();
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->adminKey)) {
    if ($database->adminKey == $data->adminKey) {

        $conn = $database->getConnection();

        if (isset($data->code)) {
            
            $code = $data->code;
            $checkQuery = "SELECT status FROM codes WHERE code = :code";
            $checkStmt = $conn->prepare($checkQuery);
            $checkStmt->bindParam(":code", $code);
            $checkStmt->execute();
            $row = $checkStmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $status = $row['status'];

                if ($status === 'active') {
                    $query = "UPDATE codes SET status = 'deleted' WHERE code = :code AND status = 'active'";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(":code", $code);

                    if ($stmt->execute()) {
                        echo json_encode(array("message" => "Билет успешно удален.", "code" => $code), JSON_UNESCAPED_UNICODE);
                    } else {
                        http_response_code(503);
                        echo json_encode(array("message" => "Не удалось удалить билет."), JSON_UNESCAPED_UNICODE);
                    }
                } else {
                    http_response_code(410); 
                    echo json_encode(array("message" => "Билет уже удален."), JSON_UNESCAPED_UNICODE);
                }
            } else {

                http_response_code(404); 
                echo json_encode(array("message" => "Билет не найден."), JSON_UNESCAPED_UNICODE);
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Отсутствует код билета в запросе."), JSON_UNESCAPED_UNICODE);
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Неверный ключ администратора."), JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Отсутствует ключ администратора."), JSON_UNESCAPED_UNICODE);
}
?>
