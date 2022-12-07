
<?php
    include_once "db_conn.php";
    include_once "ResponseStatus.php";
    $input = $_POST;
    $outputData = array();

    try{
        $player_id = $input["player_id"];
        $password = $input["password"];
        $player_name = $input["player_name"];

        $query = "SELECT player_id FROM player WHERE player_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute(array($player_id));
        $result = $stmt->fetchAll();

        if (count($result) > 0) {
            $outputData['state'] = ResponseStatusCode::$NAMETAKEN;
            $outputData['message'] = "nameTaken";
        } 
        else {
            $pwdHash = password_hash($password, PASSWORD_DEFAULT); //hash the pwd
            $indentity = 1; //player
            $zero = 0;

            $query = "INSERT INTO player (player_id, password_hash, identity, player_name, win, lost) VALUES (?, ?, ?, ?, ?, ?);";
            $stmt = $db->prepare($query);
            $result = $stmt->execute(array($player_id, $pwdHash, $indentity, $player_name, $zero, $zero));

            if ($result === TRUE) {
                $outputData['state'] = ResponseStatusCode::$OK;
                $outputData['message'] = "OK";
            } 
            else {
                $outputData['state'] = ResponseStatusCode::$ERROR;
                $outputData['message'] ="failed";
            }
        }
    }catch(Exception $e){
        $outputData['state'] = ResponseStatusCode::$ERROR;
        $outputData['message'] = $e->getMessage();
    }

    $outputJson = json_encode($outputData);
    echo $outputJson;
