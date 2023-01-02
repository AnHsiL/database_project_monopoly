<?php
    require_once "db_conn.php";

    $inputData=$_POST;
    $outputData=array();

    try{
        $sql = "SELECT count(player_id) as player_count FROM player WHERE identity=1";
        $stmt = $db->query($sql);
        $result = $stmt->fetch();
        $outputData['player_count']=$result['player_count'];
    }catch(Exception $e){

    }

    $outputJson = json_encode($outputData);
    echo $outputJson;
?>