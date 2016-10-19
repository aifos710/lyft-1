$(document).ready(function() {

	$("#numero").focus();
	$("#linea1").focus();
	$("#nombre").focus();
	$("#numero").keydown(soloNumero);
	$("#numero").keyup(validandoTelefono);
	$("#next1").click(numeroAleatorio);
	$(".linea").keydown(soloNumero);
	$(".linea").keyup(focusing);
	$("#next2").click(validarLineas);
	$("#next3").click(validarDatos);
	$("#nombre").keydown(validarNombreAp);
	$("#apellido").keydown(validarNombreAp);
	$("#apareceCell").text(guardoCell);

	var codigoValido = localStorage.getItem("validCode");// declaro globalmente la variable validCode
	var guardoCell = localStorage.getItem("guardarCell");

	if (navigator.geolocation) { 
		// también se puede usar if ("geolocation" in navigator) {}
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}


	function soloNumero(evento) {
	var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	}

	function validandoTelefono(evento) {
		var longitud = $(this).val().length;
		if (longitud == 9) {
			$("#next1").attr("href", "sign-up2.html");
			localStorage.setItem("guardarCell",$(this).val());
		} else {
			$("#next1").removeAttr("href"); 
		}
	}

	function numeroAleatorio(evento){
		var phono = $("#numero").val().length;
		var code = Math.round(Math.random()*900) + 99;
		if (phono == 9){
			$("#next1").attr("href", "sign-up2.html");
			alert("LAB-" + code);
			localStorage.setItem("validCode", code);//guardando el codigo generadode code en la var validCode
		var linea1 = $("linea")
		}
	}

	function focusing(){
       if ($(this).val().length == 1) {
       	$(this).next().focus();
       }
       if ($(this).val().length == 0) {
       	$(this).prev().focus();
       }
	}

  	 function validarLineas(){
  	 	var code = $(".linea").eq(0).val() + $(".linea").eq(1).val() + $(".linea").eq(2).val();
  	 	var linea1 = $(this).val().length == 1;
  	 	if (codigoValido == code) {
  	 		$(this).attr("href", "sign-up3.html");
  	 	} else if (linea1.length == 0){
  	 		alert("Ingrese su código por favor.")
  	 	} else if (codigoValido!== code){
  	 		alert("Código inválido.");

  	 	}
  	 }

  	 function validarDatos(evento){
        var email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var dni = $(".dni").val().length;
        var mail = $(".email").val().length;
        var maIl =$(".email").val().trim();
        if (email.test(maIl) && (dni >= 2 && dni <= 20) && (mail >= 5 && mail <= 50)) {
        	$(this).attr("href", "map-contact.html");
        } else{
        	$("#next3 ").removeAttr("href");
        }
	}

  	function validarNombreAp(evento){
  	 	var ascii = evento.keyCode;
  	 	if (ascii == 8 || ascii == 32 || (ascii >= 65 && ascii <= 90 )|| (ascii >= 97 && ascii <= 122 )) {
  	 		return true;
  	 	}else {
  	 		return false;
  	 	}
  	 }

  	
});

	function funcionExito(posicion) {
	var lat = posicion.coords.latitude;
    var lon = posicion.coords.longitude;
    var latlon = new google.maps.LatLng(lat, lon)
    var mapa = document.getElementById('mapa');
    $("#mapa").addClass("todoMapa");
    var myOptions = {
	    center:latlon,zoom:14,
	    mapTypeId:google.maps.MapTypeId.ROADMAP,
	    mapTypeControl:false,
	    zoomControl:false,
	    streetViewControl:false
    };
    
    var map = new google.maps.Map(document.getElementById('mapa'), myOptions);

    var marker = new google.maps.Marker({
    	position:latlon,
    	map:map,
    	title:"You are here!"
    });
};

    function funcionError(error) {
	console.log(error);
};



