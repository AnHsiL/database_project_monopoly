<?php
    include_once "db_conn.php";
    $input = $_POST;
    $outputData = array();

    try{
        $character_id = $input["character_id"];

        session_start();
        $player_id = $_SESSION['player_id'];

        $query = "SELECT img, character_name FROM character_list WHERE character_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute(array($character_id));
        $result = $stmt->fetchAll();

        $query = "SELECT player_name, win, lost FROM player WHERE player_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute(array($player_id));
        $result2 = $stmt->fetchAll();

        $query = "UPDATE player SET character_id = ? WHERE player.player_id = ?";
        $stmt = $db->prepare($query);
        $result3 = $stmt->execute(array($character_id, $player_id));

        if (count($result) == 1 && count($result2) == 1 && $result3) {
            $outputData['img'] = $result[0]['img'];
            $outputData['character_name'] = $result[0]['character_name'];
            $outputData['player_id'] = $player_id;
            $outputData['player_name'] = $result2[0]['player_name'];
            $outputData['win'] = $result2[0]['win'];
            $outputData['lost'] = $result2[0]['lost'];    

            $outputJson = json_encode($outputData);
            echo $outputJson;
        } 
        else{
            echo "sql error!";
        }
    }catch(Exception $e){
        echo $e->getMessage();
    }

