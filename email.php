<?php

function clean_var($variable) {
  return strip_tags(trim(rtrim($variable)));
}

$fields = '';

if (!empty($_POST['name'])) {
  $name = clean_var($_POST['name']);
} else {
  $error = true;
  $fields = $fields . 'name,';
}

if (!empty($_POST['email'])) {
  $email = clean_var($_POST['email']);
} else {
  $error = true;
  $fields = $fields . 'email,';
}

if (!empty($_POST['subject'])) {
  $subject = clean_var($_POST['subject']);
} else {
  $error = true;
  $fields = $fields . 'subject,';
}

if (!empty($_POST['message'])) {
  $message = clean_var($_POST['message']);
} else {
  $error = true;
  $fields = $fields . 'message,';
}

if ($error) {
  $arr = array('error' => true, 'fields' => $fields);
  echo json_encode($arr);
  return;
} else {
  $arr = array('error' => false);
  echo json_encode($arr);
}

?>
