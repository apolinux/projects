<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link href="bootstrap-5.0.0-beta2-dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <link href="font/bootstrap-icons.css" rel="stylesheet">
  <title></title>
</head>

<body>
  <!-- desktop view -->

  <div class="container">
    <div class="row border-bottom">
      <div class="h1 text-center">Blogger</div>
    </div>

    <div class="row">
      <!-- left panel -->
      <div class="col">
        <div class="d-flex justify-content-between">
          <h3>Blog list</h3>
          <a href="#">
            <i class="bi-plus-circle-fill" style="font-size: 2rem; color:chartreuse"></i>
          </a>
        </div>
        <!-- list begin -->
        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">mantenimiento de adminplat/servicio</h5>
            <small>5 items</small>
          </div>
          <p class="mb-1">modificación de ServiceController.php ...</p>
          <small>hace 3 dias</small>
        </a>

        <a href="#" class="list-group-item list-group-item-action " aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">mantenimiento de adminplat/servicio</h5>
            <small>5 items</small>
          </div>
          <p class="mb-1">modificación de ServiceController.php ...</p>
          <small>hace 3 dias</small>
        </a>

        <a href="#" class="list-group-item list-group-item-action " aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">mantenimiento de adminplat/servicio</h5>
            <small>5 items</small>
          </div>
          <p class="mb-1">modificación de ServiceController.php ...</p>
          <small>hace 3 dias</small>
        </a>

      </div>
      <!-- right panel -->
      <div class="col-8 border-start">
        
        <!-- new blog -->
        <h3>New Blog</h3>
        <form method="post" action="newblogpost.php">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" name="title" placeholder="write title">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" name="title" rows="3" placeholder="description"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
  </div>

  <!-- Option 1: Bootstrap Bundle with Popper -->
  <script src="bootstrap-5.0.0-beta2-dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
</body>

</html>