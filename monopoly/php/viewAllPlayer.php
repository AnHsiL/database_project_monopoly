<?php
    include_once "db_conn.php";

    $outputData = array();


    try{
        $query= " CREATE view userInfo AS
                SELECT player.player_id, player.player_name, player.win, player.lost, player.character_id, character_list.character_name
                FROM player left outer JOIN character_list using(character_id)
                WHERE player.identity = 1";

        $stmt = $db->query($query);
        $sql = "SELECT * FROM userInfo";
        $stmt = $db->query($sql);
        $result = $stmt->fetchAll();

        $outputData['data']=array();
        foreach($result as $row){
            $obj = [
                'id' => $row['player_id'],
                // 'identity' => $row['identity'],
                'name' => $row['player_name'],
                'win' => $row['win'],
                'lost' => $row['lost'],
                'character_id' => $row['character_id'],
                'character_name' => $row['character_name']
            ];
            array_push($outputData['data'], $obj);
        }

        $outputData['state']=200;
        $outputData['message']="OK";

        $query= "DROP VIEW userInfo;";
        $stmt = $db->query($query);
    }catch(Exception $e){
        $outputData['state']=500;
        $outputData['message']=$e->getMessage();
    }
    
    $outputJson = json_encode($outputData);
    echo $outputJson;
    
?>
