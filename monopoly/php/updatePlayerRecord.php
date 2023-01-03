
<?php
    session_start();
    include_once "db_conn.php";
    include_once "ResponseStatus.php";
    $input = $_POST;
    $outputData = array();

    $player_id = $_SESSION['player_id'];
    $win = $input['win'];
    $lost = $input['lost'];

    try{
        $query = "UPDATE player SET win = ?, lost = ? WHERE player.player_id = ?";
        $stmt = $db->prepare($query);
        $result = $stmt->execute(array($win, $lost, $player_id));

        if ($result) {
            $outputData['state'] = ResponseStatusCode::$OK;
            $outputData['message'] = "OK";

            $outputJson = json_encode($outputData);
            echo $outputJson;
        } 
        else {
            $outputData['state'] = ResponseStatusCode::$ERROR;
            $outputJson = json_encode($outputData);
            echo $outputJson;
        }
        
    }catch(Exception $e){
        echo $e->getMessage();
    }

?>