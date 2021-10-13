const express = require("express");

const app = express();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.use("/img", express.static("img"));
app.use(
  "/dependencias/css",
  express.static(path.join(__dirname, "/dependencias/css"))
);
app.use(
  "/DataTables-1.11.3/images/",
  express.static(path.join(__dirname, "/imagenes_datatables"))
);

app.use(
  "/dependencias/js",
  express.static(path.join(__dirname, "/dependencias/js"))
);

app.use("/public", express.static("public"));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/registro_personal", function (req, res) {
  res.sendFile(__dirname + "/registro_personal.html");
});

let raw = fs.readFileSync(__dirname + "\\public\\registro.json");
let data = JSON.parse(raw);
app.get("/checkId", (req, res) => {
  res.end("");
});

app.post("/getMarcas", (req, res) => {
  let buscar = req.body.id;
  if (buscar == undefined) {
    res.status(400).end("Error en la consulta.");
    return;
  }
  let nuevaLista = { data: [] };
  for (let usuario of data.data) {
    if (usuario.colaborador == buscar) {
      for (let marca of usuario.marcas) {
        nuevaLista.data.push(marca);
      }
      break;
    }
  }
  console.log(nuevaLista);
  res.end(JSON.stringify(nuevaLista));
});

app.post("/checkId", (req, res) => {
  let buscar = req.body.id;
  console.log(buscar);
  for (let usuario of data.data) {
    if (usuario.colaborador == buscar) {
      let d = new Date();
      //Año mes y dia
      let dia =
        d.getFullYear() +
        "/" +
        (d.getMonth() + 1).toString() +
        "/" +
        d.getDate().toString();
      let tiempo =
        d.getHours().toString() +
        ":" +
        (d.getMinutes() < 10 ? "0" : "") +
        d.getMinutes();
      let fue;
      if (usuario.marcas.length != 0) {
        if (
          usuario.marcas[usuario.marcas.length - 1].tipo == "entrada" &&
          usuario.marcas[usuario.marcas.length - 1].fecha == dia
        ) {
          //Fecha que sea igual
          fue = "salida";
        } else {
          fue = "entrada";
        }
      } else {
        fue = "entrada";
      }

      let push = { fecha: dia, hora: tiempo, tipo: fue };
      usuario.marcas.push(push);
      res.end(JSON.stringify(usuario));
      console.log(data);
      fs.writeFileSync(
        __dirname + "\\public\\registro.json",
        JSON.stringify(data)
      );
      return;
    }
  }
  res.status(400).end("El usuario no existe.");
});

app.post("/addUser", (req, res) => {
  console.log(data);
  console.log(data.data);
  console.log(data.data[0]);
  console.log(data.data[0].colaborador);
  for (let usuario of data.data) {
    if (usuario.colaborador == req.body.id) {
      res.status(400).end("El usuario ya existe.");
      return;
    }
  }
  if (
    req.body.id == typeof undefined ||
    req.body.img == typeof undefined ||
    req.body.nombre == typeof undefined ||
    req.body.apellido == typeof undefined ||
    req.body.puesto == typeof undefined
  ) {
    res.status(400).end("Campos vacios");
    return;
  }
  let nuevaLista = data;
  let nuevoUsuario = {
    colaborador: parseInt(req.body.id),
    img: req.body.img,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    puesto: req.body.puesto,
    marcas: [],
  };
  try {
    nuevaLista.data.push(nuevoUsuario);
    fs.writeFileSync(
      __dirname + "\\public\\registro.json",
      JSON.stringify(nuevaLista)
    );
    res.end("Agregado con exito");
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
  }
});

const restricciones = {
  multiples: false,
  maxFieldsSize: 2 * 1024 * 1024, //Max 2mb
  uploadDir: __dirname + "\\img",
};

app.post("/img/upload", (req, res, next) => {
  console.log("BEGIN /upload");
  console.log("======================================");
  console.log(req);

  console.log("======================================");
  const form = formidable(restricciones); //le tenes que dar el valore en bytes o algo  así, está en el readme de formidable
  form.on("file", (field, file) => {
    console.log(field);
    console.log(file.path);
    console.log(file.name);
    console.log(file.path, form.uploadDir + "\\" + file.name);
    fs.renameSync(file.path, form.uploadDir + "\\" + file.name);
  });
  form.parse(req, (err, field, file) => {
    if (err) {
      next(err);
      return;
    }
    res.end(file.name);
  });
});
// Pucha, debería dividirlo en más archivos, pero que paja
