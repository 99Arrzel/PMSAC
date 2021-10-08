var nombreArchivo = "";
function alTerminar() {
  document.getElementById("botonRegistrar").disabled = false;
  document.getElementById("imgSource").src = "/img/" + nombreArchivo;
  console.log(nombreArchivo);
}
FilePond.registerPlugin(FilePondPluginFileRename); //Para renombrar
FilePond.registerPlugin(FilePondPluginFileValidateType);//Para validar
const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement,{ acceptedFileTypes: ['image/png','image/jpeg','image/gif']});
pond.setOptions({
  fileRenameFunction: (file) => {
    nombreArchivo = `${document.getElementById("idInput").value}${
      file.extension
    }`;
    return nombreArchivo;
  },
  labelIdle: 'Sube una imagen o un gif para el "colaborador"',
  server: {
    url: "/img/upload",
  },
  allowRevert: false,
  ignoredFiles: ['']
});
pond.on("processfile", (error) => {
  //Cuando termine de subir
  if (error) {
    console.log(error);
  }
  alTerminar();
});