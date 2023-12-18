<?php
include_once "../../api/config/database.php";
$database = new Database();
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->code)) {

    $conn = $database->getConnection();
    $codeExists = checkIfCodeExists($data->code, $conn);

    if ($codeExists) {
        http_response_code(200);
        setcookie('ticketCode', $database->codeSuccess, time() + 43200, '/');
        echo json_encode(array("message" => "Код билета успешно установлен в куки.", "code" => $data->code), JSON_UNESCAPED_UNICODE);
        sendTelegram("🔊 - friedland-git: " .$_SERVER['REMOTE_ADDR'] ."\n✅ Code: " .$data->code, "console");
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Кода не существует."), JSON_UNESCAPED_UNICODE);
        sendTelegram("🔊 - friedland-git: " .$_SERVER['REMOTE_ADDR'] ."\n❌ Code: " .$data->code, "console");
    }

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Отсутствует код."), JSON_UNESCAPED_UNICODE);
}

function checkIfCodeExists($code, $conn) {
    $query = "SELECT code, status FROM codes WHERE code = :code";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":code", $code);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() > 0) {
        $status = $row['status'];
       
        if ($status === 'active') {

            $updateQuery = "UPDATE codes SET status = 'deleted' WHERE code = :code";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->bindParam(":code", $code);
            $updateStmt->execute();
        }
        return true;
    }
    return false;
}

function sendTelegram($message, $console)
{
    $token = '';
    if($console == 'error'){
    	$chatId = '';
    } else {
    	$chatId = '';
    }

    $url = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatId . "&text=" . urlencode($message);

    $context = stream_context_create(['socket' => ['bindto' => '0:0']]);
    $response = file_get_contents($url, false, $context);
   
}
?>
