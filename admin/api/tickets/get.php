<?php
include_once "../../api/config/database.php";
$database = new Database();
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->adminKey)) {
    if ($database->adminKey == $data->adminKey) {

        $conn = $database->getConnection();

        
        $query = "SELECT * FROM codes WHERE status = 'active'";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $tickets = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $tickets[] = $row;
        }

        if (count($tickets) > 0) {
            echo json_encode($tickets, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array("message" => "Билеты не найдены."), JSON_UNESCAPED_UNICODE);
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
