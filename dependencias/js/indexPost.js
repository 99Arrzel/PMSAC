
    window.onload = function () {
        document.getElementById("idInput").focus();
      };
      function hacelo(e) {
        if (e.keyCode == 13) {
          consulta();
        }
      }
      function consulta() {
        let contribuidor = document.getElementById("idInput").value;
        if (isNaN(contribuidor)) {
          let notificacion = bootbox.alert("Debe insertar un número");
            notificacion.show();
            setTimeout(function () {
              notificacion.modal("hide");
              $("#idInput").focus();
            }, 2000);
          return;
        }
        if (contribuidor.length == 0) {
          let notificacion = bootbox.alert("El ID está vacio");
            notificacion.show();
            setTimeout(function () {
              notificacion.modal("hide");
              $("#idInput").focus();
            }, 2000);
          return;
        }
  
        $.ajax({
          url: "/checkId",
          type: "POST",
          data: { id: contribuidor },
          dataType: "json",
          success: function (data) {
            console.log(data);
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("apellido").value = data.apellido;
            document.getElementById("puesto").value = data.puesto;
            document.getElementById("imgSource").src = "/img/" + data.img;
            document.getElementById("hora_entrada").value =
              data.marcas[data.marcas.length - 1].tipo == "entrada"
                ? data.marcas[data.marcas.length - 1].hora
                : data.marcas[data.marcas.length - 2].hora;
            document.getElementById("hora_salida").value =
              data.marcas[data.marcas.length - 1].tipo == "salida"
                ? data.marcas[data.marcas.length - 1].hora
                : "";
            let notificacion = bootbox.alert("Marcado con exito");
            notificacion.show();
            setTimeout(function () {
              notificacion.modal("hide");
              $("#idInput").focus();
            }, 2000);
          },
          error: function (data) {
            let notificacion = bootbox.alert("Usuario no encontrado");
            notificacion.show();
            setTimeout(function () {
              notificacion.modal("hide");
              $("#idInput").focus();
            }, 3000);
          },
        });
        setTimeout(() => {
          document.getElementById("nombre").value = "";
          document.getElementById("apellido").value = "";
          document.getElementById("puesto").value = "";
          document.getElementById("imgSource").src = "/img/1.jpg";
          document.getElementById("idInput").value = "";
          document.getElementById("hora_entrada").value = "";
          document.getElementById("hora_salida").value = "";
        }, 5000);
      }