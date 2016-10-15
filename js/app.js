$(document).ready(function() {

	var codigoValido = localStorage.getItem("validCode");// declaro globalmente la variable validCode
	
	$("#numero, .linea")focus().keydown(function(evento) {
	var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});

	$("#numero").keyup(function(evento) {
		var longitud = $(this).val().length;
		if (longitud == 9) {
			$("#next1").attr("href", "sign-up2.html");
		} else {
			$("#next1").removeAttr("href"); 
		}
	});

	$("#next1").click(function(evento){
		var phono = $("#numero").val().length;
		var code = Math.round(Math.random()*900) + 99;
		if (phono == 9){
			$("#next1").attr("href", "sign-up2.html");
			alert("LAB-" + code);
			localStorage.setItem("validCode", code);//guardando el codigo generadode code en la var validCode
		}
	});

  	 $(".linea").keydown(function(){
  	 	var ascii = evento.keyCode;
  	 	var long = $(this).val().length
  		if (ascii == 8 || (ascii >= 48 && ascii <= 57 && long == 0)) {
			return true;
		} else {
			return false;
		}
  	 })

  	 $(".linea").keyup(function(){
       if ($(this).val().length == 1) {
       	$(this).next().focus();
       }
       if ($(this).val().length == 0) {
       	$(this).prev().focus();
       }

   });

  	 $("#next2").click(function(){
  	 	var code = $(".linea").eq(0).val() + $(".linea").eq(1).val() + $(".linea").eq(2).val();
  	 	var linea1 = $(this).val().length == 1;
  	 	if (codigoValido == code) {
  	 		$(this).attr("href", "sign-up3.html");
  	 	} else if (linea1.length == 0){
  	 		alert("Ingrese su código por favor.")
  	 	} else if (codigoValido!== code){
  	 		alert("Código inválido.");

  	 	}
  	 })


       
});
