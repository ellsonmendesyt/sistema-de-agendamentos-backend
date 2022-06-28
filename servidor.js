const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const usuarioRouter = require("./routes/usuario.route");
// const agendamentoRouter = require('./routes/agendamentos.route');
const agendaRouter = require("./routes/agenda.route");
// mongoose.set("debug", true);

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/usuarios",  usuarioRouter);
// app.use("/api/agendamentos", agendamentoRouter);
app.use("/api/agendas", agendaRouter);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res, next) {
  return next(create_error(404, "Pagina não encontrada"));
});

app.use(function onError(err, req, res, next) {
  if (err.code === "11000") {
  }
  return res.json({ erro: err });
});

mongoose.connect(
  "mongodb://localhost/cristina_db",
  () => {
    console.log("Conectado a base de dados");
  },
  (error) => {
    console.log(error);
  }
);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});


