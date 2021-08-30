<?php

header('Access-Control-Allow-Origin: http://localhost:3000'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');


$target_dir = "../../images/uploaded-images/";
$target_file = $target_dir . basename($_FILES["upload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));


// if(isset($_POST["submit"])) {
  // Check if image file is a actual image or fake image
  $check = getimagesize($_FILES["upload"]["tmp_name"]);
  if ($check != true) {
    $result = array("status"=>415, "error"=>true, "message"=>"File is no an image!"); // HTTP code: 415 (meaning: Unsupported media type)
    echo json_encode($result);
  }
  // Check if file already exists
  elseif (file_exists($target_file)) {
    $result = array("status"=>409, "error"=>true, "message"=>"File already exists!"); // HTTP code: 409 (meaning: Conflict)
    echo json_encode($result);
  }
  // Check file size
  elseif ($_FILES["upload"]["size"] > 500000) {
    $result = array("status"=>406, "error"=>true, "message"=>"File is too large!"); // HTTP code: 406 (meaning: Not Acceptabble)
    echo json_encode($result);
  }
  // Allow certain file formats
  elseif($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
    $result = array("status"=>406, "error"=>true, "message"=>"Only JPG, JPEG, PNG & GIF files are allowed!"); // HTTP code: 406 (meaning: Not Acceptabble)
    echo json_encode($result);
  }
  else {
    // Upload the file
    if (move_uploaded_file($_FILES["upload"]["tmp_name"], $target_file)) {
      $result = array("status"=>202, "error"=>false, "message"=>"Image upload successfull!"); // HTTP code: 202 (meaning: Accepted)
      echo json_encode($result);
    } else {
      // If there was some error return relevant response
      $result = array("status"=>417, "error"=>true, "message"=>"Sorry, there was an error uploading your file!"); // HTTP code: 417 (meaning: Expectation failed)
      echo json_encode($result);
    }
  }
// }
?>