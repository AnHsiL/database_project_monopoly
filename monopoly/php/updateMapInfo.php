<?php
    include_once "db_conn.php";

    $query = "UPDATE map_info SET (grade = '$_POST[grade]', owner = '$_POST[owner]', price = '$_POST[price]') WHERE name = '$_POST[name]'";
    $stmt = $db->prepare($query);

    $stmt->bind_param("isis", $grade, $name, $price, $owner);

    $stmt->execute();
    $stmt->close();
?>