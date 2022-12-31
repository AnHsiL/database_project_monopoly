<?php
    include_once "db_conn.php";
    include_once "ResponseStatus.php";
    $input = $_POST;
    $outputData = array();

    try{
        $player_id = $input["player_id"];
        $password = $input["password"];

        // -- manager's account and password --
        //  $player_id = "master";
        //  $password = "123456";
        // ------------------------------------
       
        $query = "SELECT password_hash, player_name FROM player WHERE player_id = ?";
        $stmt = $db->prepare($query);
        $stmt -> execute(array($player_id));
        $result = $stmt->fetchAll();
        
        $outputData['state'] = ResponseStatusCode::$LOGINFAILED;
        $outputData['message'] = "login failed";


        if(count($result) == 1){
            if(password_verify($password, $result[0]['password_hash'])){
                session_start();
                $_SESSION["player_id"] = $player_id;
                $_SESSION["player_name"] =  $result[0]['player_name'];

                $sql = "SELECT identity, player_id FROM player WHERE player_id = '".$player_id."';";
                //$sql = "SELECT identity FROM player WHERE player_id = 'master';";
                $stmt2 = $db->query($sql);
                $result2 = $stmt2->fetchAll();
                if(count($result2) == 1){
                    $outputData['player_id'] = $result2[0]['player_id'];
                    $outputData['identity'] = $result2[0]['identity'];
                    $outputData['state'] = ResponseStatusCode::$OK;
                    $outputData['message'] = "OK";
                }                
            }            
        }
    }catch(Exception $e){
        $outputData['identity'] = 5;
        $outputData['state'] = ResponseStatusCode::$ERROR;
        $outputData['message'] = $e -> getMessage();
    }
    $outputJson = json_encode($outputData);
    echo $outputJson;
?>