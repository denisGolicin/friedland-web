<?

include_once "api/config/database.php";
$database = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    if(isset($_COOKIE["AUTH_TOKEN"])) {
        if($_COOKIE["AUTH_TOKEN"] == $database->admin_token){
            sendTelegram("🔊 - friedland-git 🌐: " .$_SERVER['REMOTE_ADDR'] ." ✅", "console");
            return include('provider/admin.html');
            exit();
        }
    } else {

        sendTelegram("🔊 - friedland-git 🌐: " .$_SERVER['REMOTE_ADDR'], "console");
        return include('provider/auth.html');
        exit();

    }
}
    

function sendTelegram($message, $console)
{
    $token = '5458155555:AAFvGNcxewNki4bM5vjUxsbki7TDNcTmY18';
    if($console == 'error'){
    	$chatId = '-1001868993888';
    } else {
    	$chatId = '-1001854623307';
    }

    $url = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatId . "&text=" . urlencode($message);

    $context = stream_context_create(['socket' => ['bindto' => '0:0']]);
    $response = file_get_contents($url, false, $context);
   
}
?>