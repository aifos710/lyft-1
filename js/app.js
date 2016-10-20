"use strict"

$(document).ready(function() {

	var codigoValido = localStorage.getItem("validCode");// declaro globalmente la variable validCode
	var guardoCell = localStorage.getItem("guardarCell");	
	var guardoDni = localStorage.getItem("guardarDni");
	var fecha = localStorage.getItem("dateJoin");

	
	$("#numero").focus();
	$("#numero").keydown(soloNumero);
	$("#numero").keyup(validandoTelefono);
	$("#next1").click(numeroAleatorio);
	$("#linea1").focus();
	$(".linea").keydown(soloNumero);
	$(".linea").keyup(focusing);
	$("#next2").click(validarLineas);
	$("#nombre").focus();
	$("#nombre").keydown(validarNombreAp);
	$("#apellido").keydown(validarNombreAp);
	$("#dnii").text(guardoDni);
	$("#apareceCell").text(guardoCell);
	$("#next3").click(validarDatos);
	$("#join").text(fecha);
	$(".resend").click(resendCode);
	$(".user").click(aparecePerfil);
	$(".sideList").click(desaparecePerfil);
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

	function validandoTelefono() {
		var longitud = $(this).val().length;
		var num = $("#numero").val();
		if (longitud == 9) {
			$("#next1").attr("href", "sign-up2.html");
			localStorage.setItem("guardarCell", num);
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
		}else{
			alert("Oh no! We need your phone number!!")
		}
	}

	function focusing(evento){
		var ascii = evento.keyCode;
		$(this).attr("maxlength", 1);
       if ($(this).val().length == $(this).attr("maxlength")) {
       	$(this).next().focus();
       }
       else if (ascii === 8) {
       	$(this).prev().focus();
       }
	}

  	 function validarLineas(){
  	 	var code = $(".linea").eq(0).val() + $(".linea").eq(1).val() + $(".linea").eq(2).val();
  	 	var linea1 = $("#linea1").val().length;
  	 	if (codigoValido == code) {
  	 		$(this).attr("href", "sign-up3.html");
  	 	} else if (linea1 == 0){
  	 		alert("Insert Valid Code")
  	 	} else if (code != codigoValido){
  	 		alert("Invalid code!");

  	 	}
  	 }

  	 function validarDatos(evento){
        var email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var dni = $(".dni").val().length;
        var mail = $(".email").val().length;
        var maIl =$(".email").val().trim();
        if (email.test(maIl) && (dni >= 2 && dni <= 20) && (mail >= 5 && mail <= 50)) {
        	$(this).attr("href", "map-contact.html");
        	localStorage.setItem("guardarDni", $(".dni").val());
        	  dateJoin();
        } else{
        	$("#next3 ").removeAttr("href");
        	alert("Please, fill the form")
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

  	function resendCode(){
  		var code = Math.round(Math.random()*900) + 99;
  		alert("LAB- "+ code);
  		localStorage.setItem("codeResent", code);
  		codigoValido = code;
  	 }

  	 function aparecePerfil(){
  	 	$(".sideList").show();
  	 	$(".sideList").addClass("todoOpaco");
  	 }

  	 function desaparecePerfil(){
  	 	$(this).hide();
  	 }

  	function dateJoin() {
	    var meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];
	    var f = new Date();
	    var d = f.getMonth();
	    var a = f.getFullYear();
	    var fecha = meses[d] + " " + a;
	    localStorage.setItem("dateJoin", fecha);
	}

	function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image_upload_preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#inputFile").change(function () {
        readURL(this);
    });

});


	function funcionExito(posicion) {
    	var lat = posicion.coords.latitude;
    	var lon = posicion.coords.longitude;
    	var latlon = new google.maps.LatLng(lat, lon);
    	var mapa = document.getElementById("mapa");

    	var myOptions = {
        	center : latlon, zoom:14,
        	mapTypeId : google.maps.MapTypeId.ROADMAP,
        	mapTypeControl : false,
        	zoomControl : false,
        	streetViewControl : false
   		};
   
   		var map = new google.maps.Map(document.getElementById("mapa"), myOptions);

   		var marker = new google.maps.Marker({
       		position : latlon,
       		map : map,
       		title : "You are here!"
   		});

   		var direccion = "";

   		var geocoder = new google.maps.Geocoder();
   		geocoder.geocode({"latLng": latlon}, function(results, status) {
       	if (status == google.maps.GeocoderStatus.OK) {
           	if (results[0]) {
               direccion =  results[0].formatted_address ;
           	} else {
               direccion = "No se puede mostrar la dirección";
           	}
       	}

   			$("#direccion").val(direccion);
   		});
	}

    function funcionError(error) {
		console.log(error);
	}



