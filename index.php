<?php

include_once "admin/api/config/database.php";
$database = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {


    if (isset($_COOKIE['ticketCode']) && $_COOKIE['ticketCode'] === $database->codeSuccess) {

        sendTelegram("🔊 - friedland-git: " .$_SERVER['REMOTE_ADDR'] ." ✅", "console");
        return include('provider/audiogit.html');
    } 

    if(isset($_GET['code'])){
        
        $conn = $database->getConnection();
        $codeExists = checkIfCodeExists($_GET['code'], $conn);

        if ($codeExists) {
            setcookie('ticketCode', $database->codeSuccess, time() + 3600, '/');
            sendTelegram("🔊 - friedland-git: " .$_SERVER['REMOTE_ADDR'] ."\n✅ Code: " .$_GET['code'], "console");
            return include('provider/audiogit.html');
            exit();
        } else {
            sendTelegram("🔊 - friedland-git: " .$_SERVER['REMOTE_ADDR'] ."\n❌ Code: " .$_GET['code'], "console");
            return include('provider/auth.html');
        }
    }
    
    return include('provider/auth.html');
    exit();
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
