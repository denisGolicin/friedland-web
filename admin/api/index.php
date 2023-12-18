<?

include_once "api/config/database.php";
$database = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    if(isset($_COOKIE["AUTH_TOKEN"])) {
        if($_COOKIE["AUTH_TOKEN"] == $database->admin_token){
            return include('provider/admin.html');
            exit();
        }
    } else {

        return include('provider/auth.html');
        exit();

    }
}
    
?>