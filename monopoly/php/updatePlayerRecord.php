
<?php
    session_start();
    include_once "db_conn.php";
    include_once "ResponseStatus.php";
    $input = $_POST;
    $outputData = array();
    $player_id = $input['player_id']
    $win = $input['win'];
    $lost = $input['lost'];

    try{
        $query = "UPDATE player SET win = ?, lost = ? WHERE player_id = ?";
        $stmt = $db->prepare($query);
        $result = $stmt->execute(array($win, $lost, $player_id));
      
        if ($result === TRUE) {
            $outputData['state'] = ResponseStatusCode::$OK;
            $outputData['message'] = "OK";
        } 
        else {
            $outputData['state'] = ResponseStatusCode::$ERROR;
            $outputData['message'] ="failed";
        }
        
    }catch(Exception $e){
        $outputData['state'] = ResponseStatusCode::$ERROR;
        $outputData['message'] = $e->getMessage();
    }

    $outputJson = json_encode($outputData);
    echo $outputJson;
?>