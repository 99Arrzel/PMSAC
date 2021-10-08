const hoy = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
var dataActualUser = " ";
const impFecha = hoy.toLocaleDateString('es-ES', options);
var tablas = {}
var idReload = 1;
tablas.len = {
  "decimal": "",
  "emptyTable": "No hay datos",
  "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
  "infoEmpty": "Mostrando 0 a 0 de 0 registros",
  "infoFiltered": "(Filtro de _MAX_ total registros)",
  "infoPostFix": "",
  "thousands": ",",
  "lengthMenu": "Mostrar _MENU_ Registros",
  "loadingRecords": "Cargando...",
  "processing": "Procesando...",
  "search": "Buscar:",
  "zeroRecords": "No se encontraron coincidencias",
  "paginate": {
    "first": "Primero",
    "last": "Ultimo",
    "next": "Siguiente",
    "previous": "Anterior"
  },
  "aria": {
    "sortAscending": ": Activar orden de columna ascendente",
    "sortDescending": ": Activar orden de columna desendente"
  }
},
  $(document).ready(function () {
    tablas.detalles = $('#tabla_detalles').DataTable({
      ajax: {
        url: "/getMarcas",
        type: "POST",
        data: function getIdData() {
          return { id: idReload }
        }
      },
      buttons: [{
        extend: 'copy',
        text: 'Copiar',
        exportOptions: {
          columns: [0, 1, 2],
        },

        filename: function(){return dataActualUser + " | " + impFecha},
        messageTop: function(){return dataActualUser + " | " + impFecha},
      },
      {
        extend: 'csv',
        text: 'CSV',
        exportOptions: {
          columns: [0, 1, 2],
        },

        filename: function(){return dataActualUser + " | " + impFecha},
        messageTop: function(){return dataActualUser + " | " + impFecha},
      },
      {
        extend: 'excel',
        text: 'EXCEL',
        exportOptions: {
          columns: [0, 1, 2],
        },

        filename: function(){return dataActualUser + " | " + impFecha},
        messageTop: function(){return dataActualUser + " | " + impFecha},
      },
      {
        extend: 'pdf',
        text: 'PDF',
        exportOptions: {
          columns: [0, 1, 2],
        },

        filename: function(){return dataActualUser + " | " + impFecha},
        messageTop: function(){return dataActualUser + " | " + impFecha},
      },
      {
        extend: 'print',
        text: 'Imprimir',
        exportOptions: {
          columns: [0, 1, 2],
        },
        filename: function(){return dataActualUser + " | " + impFecha},
        messageTop: function(){return dataActualUser + " | " + impFecha},
      },
      ],
      dom: 'B<lf>rtip',
      columns: [
        {
          data: "fecha"
        },
        {
          data: "hora"
        },
        {
          data: "tipo"
        }
      ],
      language: tablas.len
    });
    tablas.usuarios = $('#table_id').DataTable({
      ajax: 'http://localhost:3000/public/registro.json',
      rowGroup: {
        dataSrc: "puesto"
      },
      buttons: [{
        extend: 'copy',
        text: 'Copiar',
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5],
        },

        filename: "Reporte de usuarios : " + impFecha,
        messageTop: "Reporte de usuarios : " + impFecha,
      },
      {
        extend: 'csv',
        text: 'CSV',
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5],
        },

        filename: "Reporte de usuarios : " + impFecha,
        messageTop: "Reporte de usuarios : " + impFecha,
      },
      {
        extend: 'excel',
        text: 'EXCEL',
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5],
        },

        filename: "Reporte de usuarios : " + impFecha,
        messageTop: "Reporte de usuarios : " + impFecha,
      },
      {
        extend: 'pdf',
        text: 'PDF',
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5],
        },

        filename: "Reporte de usuarios : " + impFecha,
        messageTop: "Reporte de usuarios : " + impFecha,
      },
      {
        extend: 'print',
        text: 'Imprimir',
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5],
        },
        filename: "Reporte de usuarios : " + impFecha,
        messageTop: "Reporte de usuarios : " + impFecha,
      },
      ],

      dom: 'B<lf>rtip',
      columns: [
        {
          data: "nombre",
        },
        {
          data: "apellido"
        },
        {
          data: "puesto"
        },
        {
          data: "colaborador"
        },
        {
          data: "img",
          render: function (data) {
            return `<img
          style="
            min-width: 100px;
            max-width: 200px;
            height: auto; 
          "
          alt="Imagen de usuario"
          src="img/${data}"
          class="d-flex justify-content-center"
        />`
          }
        },
        {
          data: null,
          defaultContent: "<button class='btn btn-primary form-control' data-bs-toggle='modal' data-bs-target='#miModal'>Ver detalles</button>"
        }
      ],
      language: tablas.len
    });
    $('#table_id tbody').on('click', 'button', function () {
      var data = tablas.usuarios.row($(this).parents('tr')).data();
      $("#miModalLabel").html("Detalles del " + data['puesto'] + ": " + data['nombre'] + " " + data['apellido']);
      idReload = data['colaborador'];
      dataActualUser = "Detalles del " + data['puesto'] + ": " + data['nombre'] + " " + data['apellido'];
      console.log(dataActualUser);
      tablas.detalles.ajax.reload();
    });
  });
