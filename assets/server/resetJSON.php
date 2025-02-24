<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = file_get_contents('../../kopija.json');

  $database = fopen('../../raspored.json', 'w');
  fwrite($database, $data);
  fclose($database);
}
