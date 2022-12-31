<?php
require_once "db_conn.php";

$inputData=$_POST;
$outputData=array();

$del_arr = $inputData['del_arr'];

try{
    $sql = "SELECT player_id FROM player";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll();
    $outputData['data']=array();
    foreach($result as $row){
        for ($i=0; $i<count($del_arr); $i++) {
            if($del_arr[$i] == $row['player_id']){
                //echo($del_arr[$i]);
                $sql2="DELETE FROM player WHERE player_id='".$del_arr[$i]."';";
                $stmt=$db->query($sql2);
                if($stmt===TRUE){
                    $outputData["state"] = 200;
                    $outputData["message"] = "delete success";
                }else{
                    //throw new Exception("MySQL is broken.".$result);
                }
            }else{
                array_push($outputData['data'], $row['player_id']);
            }
        }
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