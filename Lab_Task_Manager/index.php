<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css"> 
    <title>TO-DO List</title>
</head>

<body>
    <h1>TO-DO List</h1>
    
    <form method="POST" action="save_task.php">
        <input type="text" name="task" placeholder="Enter a new task" required>
        <input type="date" name="due_date" required>
        <button type="submit">Add task</button>
        <?php if(isset($_GET['error'])): ?>
            <p class="error"><?php echo htmlspecialchars($_GET['error']); ?></p>
        <?php endif; ?>
    </form> 

    <div id="tasksContainer">
        <?php
        $tasksFile = 'tasks.json';
        if (file_exists($tasksFile)) {
            $tasks = json_decode(file_get_contents($tasksFile), true);
            if (!empty($tasks)) {
                foreach ($tasks as $task) {
                    echo '<p>' . htmlspecialchars($task['name']) . ' - (due: ' . htmlspecialchars($task['due_date']) . ')</p>';
                }
            } else {
                echo '<p>No tasks available.</p>';
            }
        }
        ?>
    </div>

</body>

</html>