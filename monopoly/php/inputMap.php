<?php
    include_once "db_conn.php";
    include_once "ResponseStatus.php";

    $url = "map.json";

    $handle = fopen($url, "rb");
    $content = "";
    while (!feof($handle)) {
        $content .= fread($handle, 100000);
    }
    fclose($handle);
    $content = json_decode($content, true);

    $query = "INSERT INTO map_info (map_id, name, owner, grade, price, discription) VALUES (?, ?, ?, ?, ?, ?);";
    $stmt = $db->prepare($query);

    $stmt->bind_param("issiis", $map_id, $name, $owner, $grade, $price, $discription);
    
    $idx = 1;
    foreach ($content as $key => $value) {

        $map_id = $idx++;
        $name = $value['name'];
        $owner = $value['owner'];
        $grade = $value['grade'];
        $price = $value['price'];
        $discription = $value['discription'];


        $stmt->execute();
    }
    $stmt->close();

?>