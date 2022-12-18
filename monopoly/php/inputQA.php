<?php
    include_once "db_conn.php";
    include_once "ResponseStatus.php";

    $url = "question.json";

    $handle = fopen($url, "rb");
    $content = "";
    while (!feof($handle)) {
        $content .= fread($handle, 100000);
    }
    fclose($handle);
    $content = json_decode($content, true);

    $query = "INSERT INTO qustion (question_id, description, option_A, option_B, option_C, option_D, answer) VALUES (?, ?, ?, ?, ?, ?, ?);";
    $stmt = $db->prepare($query);

    $stmt->bind_param("issssss", $question_id, $description, $option_A, $option_B, $option_C, $option_D, $answer);


    foreach ($content as $key => $value) {

        $question_id = $value['n'];
        $description = $value['title'];
        $option_A = $value['A'];
        $option_B = $value['B'];
        $option_C = $value['C'];
        $option_D = $value['D'];
        $answer = $value['ans'];

        $stmt->execute();
    }
    $stmt->close();

?>