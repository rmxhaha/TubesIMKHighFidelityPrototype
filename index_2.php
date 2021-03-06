<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Welcome!</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="our.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
     <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">Groop</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Communities</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Messages</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php 
                  if(isset($_POST['username']))
                  { 
                    echo $_POST['username'] ;
                  }
                  else 
                  {
                    echo 'Bimo'; 
                  }?><span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Paus Hijau India Anonymous</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="profile_user.html">Profile</a></li>
                <li><a href="user_setting.html">Settings</a></li>
                <li><a href="index.html">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 text-center">
          <div style="padding-top : 9em">
            <h1 style="font-size:9em; font-family:'Segoe UI'">Groop</h1>
			<br>
			<form class="form-group navbar-form navbar-center">


				  <select class="form-control" id=selectBox onclick="changeEvt()">
				  <option value="namakomunitas">Community</option>
				  <option value="namatokoh">Members</option>
				  <option value="diskusi">Discussion</option>

				  <option value="lainnya">Events</option>
				</select>
				<input type="text" name="search" placeholder="Telusuri mengenai.." class="form-control" style="width:300px">
				<div class="tanggal hidden">
					<br>
                    Dari
					<input type=date class=form-control />
                    &nbsp;
                    Sampai
					<input type=date class=form-control />
				</div>
				<br><br>
				<a href="search_result.html" class="btn btn-primary"> Search </a>
				<button class="btn btn-default"> Random </button>
			</form>
          </div>
        </div>
      </div>
	  </div>
    </div>


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="bower_components\jquery\dist\jquery.js"></script>
				  <script>
				  function changeEvt(){
					    var selectBox = document.getElementById("selectBox");
						var selectedValue = selectBox.options[selectBox.selectedIndex].value;
						if( selectedValue == "lainnya" )
							$(".tanggal").removeClass("hidden");
                        else
							$(".tanggal").addClass("hidden");
						console.log(selectedValue);
				   }
				  </script>    <script src="js/bootstrap.min.js"></script>

  </body>
</html>