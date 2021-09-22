<?php
// This will handle all requests related to website templates

require_once './controllers/Users.php';

set_exception_handler(function ($e) {
 $code = $e->getCode() ?: 400;
 header("Content-Type: application/json", false, $code);
 echo json_encode(["error" => $e->getMessage()]);
 exit;
});

$verb = $_SERVER['REQUEST_METHOD'];
$url_pieces = explode('/', $_SERVER['REQUEST_URI']);

