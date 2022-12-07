<?php
    $user = 'monopoly_admin';//資料庫使用者名稱
    $password = 'mariadbphp1111';//資料庫的密碼
    try{
        $db = new PDO('mysql:host=127.0.0.1:3307; dbname=monopoly; charset=utf8', $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }catch(PDOException $e){
        print("error!");
        die();
    }
?>
