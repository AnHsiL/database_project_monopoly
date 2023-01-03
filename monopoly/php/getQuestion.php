<?php
    include_once "db_conn.php";
    include_once "ResponseStatus.php";

    $outputData= array();

    $query = "SELECT MAX(question_id) AS maxQuestionId FROM qustion";
    $stmt = $db->query($query);
    $resultMax = $stmt->fetch();
    $resultMax = $resultMax['maxQuestionId'];
    $randomNum = rand(1, $resultMax);

    try{
        $query = ("SELECT * FROM qustion WHERE qustion.question_id = ?");
        $stmt = $db->prepare($query);
        $error = $stmt->execute(array($randomNum));
        $result = $stmt->fetch();
        $outputData['data']= [
            'question_id' => $result['question_id'],
            'description' => $result['description'],
            'option_A' => $result['option_A'],
            'option_B' => $result['option_B'],
            'option_C' => $result['option_C'],
            'option_D' => $result['option_D'],
            'answer' => $result['answer']
        ];
        $outputData['state']=200;
        $outputData['message']="OK";
        
    }catch(Exception $e){
        $outputData['state']=500;
        $outputData['message']=$e->getMessage();
    }
    $outputJson = json_encode($outputData);
    echo $outputJson;
    
?>