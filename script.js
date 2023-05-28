$(document).ready(function() {
    // Obtener lista de alumnos al cargar la página
    function cargarAlumnos() {
      $.ajax({
        url: "alumnos.php",
        type: "GET",
        success: function(data) {
          var alumnos = JSON.parse(data);
          var tablaAlumnos = $("#alumnosTable tbody");
  
          tablaAlumnos.empty();
  
          alumnos.forEach(function(alumno) {
            var row = "<tr><td>" + alumno.id + "</td><td>" + alumno.nombre + "</td><td>" + alumno.apellido + "</td></tr>";
            tablaAlumnos.append(row);
          });
        }
      });
    }
  
    cargarAlumnos(); // Cargar la tabla al iniciar la página
  
    // Agregar un nuevo alumno
    $("#alumnoForm").submit(function(event) {
      event.preventDefault();
  
      var nombre = $("#nombre").val();
      var apellido = $("#apellido").val();
  
      $.ajax({
        url: "alumnos.php",
        type: "POST",
        data: { nombre: nombre, apellido: apellido },
        success: function(data) {
          console.log("🚀 ~ file: script.js:33 ~ $ ~ data:", data);
          
          // Mostrar el mensaje flotante
          var mensajeFlotante = $("#mensaje-flotante");
          const classMss1 = "alert alert-success footer-message";
          const classMss2 = "d-none";
  
          mensajeFlotante.html(`<i class="fas fa-check-circle"></i> ${data}`);
          mensajeFlotante.removeClass(classMss2);
          mensajeFlotante.addClass(classMss1);

          setTimeout(() => {
            mensajeFlotante.addClass(classMss2)
            mensajeFlotante.removeClass(classMss1)
          }, 1500);
  
          // Limpiar los campos del formulario
          $("#nombre").val("");
          $("#apellido").val("");
  
          cargarAlumnos(); // Actualizar la tabla sin recargar la página
        }
      });
    });
  });
  