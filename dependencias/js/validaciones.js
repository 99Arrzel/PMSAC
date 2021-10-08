function desBloquear() {
    setTimeout(() => {
      pond.setOptions({ disabled: false });
    }, 2000);
  }
  function consulta() {
    let contribuidor = document.getElementById("idInput").value;
    let nombre = document.getElementById("Nombre").value;
    let apellido = document.getElementById("Apellido").value;
    if (isNaN(contribuidor)) {
      alert("Debe insertar un número");
      return;
    }
    if (contribuidor.length == 0) {
      alert("El ID está vacio.");
      return;
    }
    if (nombre.length == 0) {
      alert("Ingrese un nombre");
      return;
    }
    if (!isNaN(nombre)) {
      alert("Coloque un nombre válido");
      return;
    }
    if (apellido.length == 0) {
      alert("Ingrese un apellido");
      return;
    }
    if (!isNaN(apellido)) {
      alert("Coloque un apellido válido");
      return;
    }

    $.ajax({
      url: "/addUser",
      type: "POST",
      data: {
        id: document.getElementById("idInput").value,
        img: nombreArchivo,
        nombre: document.getElementById("Nombre").value,
        apellido: document.getElementById("Apellido").value,
        puesto: document.getElementById("puesto").value
      },
      success: function (data) {
        let notificacion = bootbox.alert("Registrado con exito");
        notificacion.show();
        setTimeout(function () {
          notificacion.modal("hide");
        }, 2000);
      },
      error: function (data) {
        let notificacion = bootbox.alert("Registro fallido : " + JSON.stringify(data.responseText));
        notificacion.show();
        setTimeout(function () {
          notificacion.modal("hide");
        }, 3000);
      },
    });
    setTimeout(() => {
      document.getElementById("Nombre").value = "";
      document.getElementById("Apellido").value = "";
      document.getElementById("puesto").value = "";
      document.getElementById("imgSource").src = "/img/1.jpg";
      document.getElementById("idInput").value = "";
      //Hola, que copio ? te lo paso por un rar mejor xd
      //
      pond.removeFiles();
      tablas.usuarios.ajax.reload();
    }, 5000);
  }