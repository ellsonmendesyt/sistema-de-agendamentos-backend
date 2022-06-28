const mongoose = require("mongoose");

const horarioSChema = new mongoose.Schema({
  hora: {
    type: String,
  },
  ocupado: {
    type: Boolean,
    default: false,
  },
});

const agendaSchema = new mongoose.Schema(
  {
    dia: {
      type: String,
      index: [{ unique: true, dropDups: true }],
    },
    horarios: [horarioSChema],
  },
  { timestamps: true }
);










module.exports = mongoose.model("Agenda", agendaSchema);
