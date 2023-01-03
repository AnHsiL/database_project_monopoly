<?php
    require_once "db_conn.php";

    $inputData=$_POST;
    $outputData=array();

    try{
        $player = 1;
        $admin = 0;
        $sql = "select count_player($player);";
        $stmt = $db->query($sql); 
        $result = $stmt->fetch();
        $outputData['player_count']=$result["count_player(1)"];
    }catch(Exception $e){

    }

    $outputJson = json_encode($outputData);
    echo $outputJson;
?>
