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

    $query = "INSERT INTO map_info (map_id, name, price, discription, paymentRate, upgradeRate) VALUES (?, ?, ?, ?, ?, ?);";
    $stmt = $db->prepare($query);

    $stmt->bind_param("isisdd", $map_id, $name, $price, $discription, $paymentRate, $upgradeRate);
    
    $idx = 1;
    foreach ($content as $key => $value) {

        $map_id = $idx++;
        $name = $value['name'];
        $price = $value['price'];
        $discription = $value['discription'];
        $paymentRate = $value['price']*0.7;
        $upgradeRate = $value['price']*1.5;

        $stmt->execute();
    }
    $stmt->close();

?>