<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link href="bootstrap-5.0.0-beta2-dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <link href="font/bootstrap-icons.css" rel="stylesheet">
  <title>Hello, world!</title>
</head>

<body>
  <!-- desktop view -->

  <div class="container">
  <div class="row border-bottom justify-content-around">
      <div class="col h1 text-center">Blogger</div>
      <div class="col msg align-self-end">
        <div class="alert alert-primary py-1">
          The item has been created
        </div>
      </div>
    </div>

    <div class="row">
      <!-- left panel -->
      <div class="col">
        <div class="d-flex justify-content-between">
          <h3>Blog list</h3>
          <a href="newblog.php">
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
        

        <!-- detail list -->
        <div class="row">
          <!-- detail 1 - datetime1 -->
          <div class="col">
            <!-- title -->
            <div class="row">
              <div class="col">
                <div class="d-flex justify-content-between">
                  <h4>mantenimiento de adminplat/servicio</h4> 
                  <a href="newitem.php">
                    <i class="bi-plus-circle-fill" style="font-size: 2rem; color:chartreuse"></i>
                  </a>
                </div>
              </div>
            </div>
            <!-- search detail -->
            <div class="row">
              <input type="text" name="search_detail" placeholder="search in detail list">
            </div>

            <!-- Description -->
            <div class="list-group list-group-flush">
            
            <a href="#" class="list-group-item list-group-item-action">
            <small>10 de mayo de 2021 15:35</small>
              <div class="">
              modificación de ServiceController.php. Subida al repo, pendiente revisar en producción.
              </div>
            </a>

            <a href="#" class="list-group-item list-group-item-action">
            <small>11 de mayo de 2021 16:10</small>
              <div class="">
              Agregar un nuevo servidor para mozambique en db.php, subir al repo y a producción.
              </div>
            </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>

  <!-- Option 1: Bootstrap Bundle with Popper -->
  <script src="bootstrap-5.0.0-beta2-dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
</body>

</html>