<?php
    include_once "db_conn.php";

    $data=$_POST;
    $outputData= array();
    try{
        $map_id = $_POST["id"];
        $query = ("SELECT * FROM map_info WHERE map_id = ?");
        $stmt = $db->prepare($query);
        $error = $stmt->execute(array($map_id));
        $result = $stmt->fetch();
        $outputData['data']= [
            'map_id' => $result['map_id'],
            'name' => $result['name'],
            'price' => $result['price'],
            'discription' => $result['discription']
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