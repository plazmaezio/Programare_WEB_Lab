<?php
$task_file = 'tasks.json';
$tasks = [];

if(file_exists($task_file)) {
    $tasks = json_decode(file_get_contents($task_file), true);
} else {
    $tasks = [];
    file_put_contents($task_file, json_encode($tasks));
}

if(isset($_POST['task']) && !empty($_POST['task']) && isset($_POST['due_date']) && !empty($_POST['due_date'])) {
    $new_task = [
        'name' => $_POST['task'],
        'due_date' => $_POST['due_date']
    ];
    $tasks[] = $new_task;
    file_put_contents($task_file, json_encode($tasks, JSON_PRETTY_PRINT));
}

header('Location: index.php');
?>