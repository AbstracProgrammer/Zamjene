<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = file_get_contents("php://input");
  $data = json_decode($data, true);

  $database = fopen('../../raspored.json', 'w');
  fwrite($database, $data['json']);
  fclose($database);
}
