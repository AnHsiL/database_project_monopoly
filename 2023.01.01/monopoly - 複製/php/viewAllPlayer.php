<?php
    include_once "db_conn.php";

    $outputData = array();

    try{
        $sql = "SELECT * FROM player";
        $stmt = $db->query($sql);
        $result = $stmt->fetchAll();

        $outputData['data']=array();
        foreach($result as $row){
            $obj = [
                'id' => $row['player_id'],
                'identity' => $row['identity'],
                'name' => $row['player_name'],
                'character_id' => $row['character_id'],
                'win' => $row['win'],
                'lost' => $row['lost'],
            ];
            array_push($outputData['data'], $obj);
        }

        $outputData['state']=200;
        $outputData['message']="OK";
    }catch(Exception $e){
        $outputData['state']=500;
        $outputData['message']=$e->getMessage();
    }
    
    $outputJson = json_encode($outputData);
    echo $outputJson;
    
?>