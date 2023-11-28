<?php

   @include 'isConnected.php';

?>

<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>admin page</title>
</head>
<body>
   
<div>

   <div>
      <h3>hi, <span>admin</span></h3>
      <h1>welcome <span><?php echo $_SESSION['admin_name'] ?></span></h1>
      <p>this is an admin page</p>
      <a href="logout.php">logout</a>
   </div>

</div>

</body>
</html>