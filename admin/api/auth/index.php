<?

include_once "../../api/config/database.php";
$database = new Database();
$data = json_decode(file_get_contents("php://input"));
if (!empty($data->adminKey) && !empty($data->login) && !empty($data->password) && $data->adminKey == $database->adminKey) {

    if(
        $database->adminKey == $data->adminKey &&
        $database->user_login == $data->login &&
        $database->user_password == $data->password 
    ) 
    {
        setcookie('AUTH_TOKEN', $database->admin_token, time() + 43200, "/");
        $result = array('success' => true, 'message' => 'Successful authorization!');
        echo json_encode($result);
    } else {

        echo json_encode(array("message" => "error"), JSON_UNESCAPED_UNICODE);

        sendTelegram("🔊 - friedland-git 🌐: " .$_SERVER['REMOTE_ADDR'] ."\n❌ Логин: " .$data->login ."\n❌ Пароль: " .$data->password, "console");
        return false;
        exit();

    }
    
} else {

    echo json_encode(array("message" => "error"), JSON_UNESCAPED_UNICODE);
    return false;
    exit();

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