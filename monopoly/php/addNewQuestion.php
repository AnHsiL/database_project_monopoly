
<?php
    include_once "db_conn.php";
    include_once "ResponseStatus.php";
    $input = $_POST;
    $outputData = array();

    try{
        $description = $input["title"];
        $option_A = $input["A"];
        $option_B = $input["B"];
        $option_C = $input["C"];
        $option_D = $input["D"];
        $answer = $input['ans'];

        $query = "INSERT INTO qustion (description, option_A, option_B, option_C, option_D, answer) VALUES (?, ?, ?, ?, ?, ?);";
        $stmt = $db->prepare($query);
        $result = $stmt->execute(array($description, $option_A, $option_B, $option_C, $option_D, $answer));
      
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