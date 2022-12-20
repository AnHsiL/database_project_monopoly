<?php
    $user = 'AnHsi';//資料庫使用者名稱
    $password = 'anhsi';//資料庫的密碼
    try{
        $db = new PDO('mysql:host=localhost; dbname=monopoly; charset=utf8', $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        // echo "succ to connect database.";
    }catch(PDOException $e){
        print("error!");
        echo " " .$e->getMessage();
        die();
    }
?>
