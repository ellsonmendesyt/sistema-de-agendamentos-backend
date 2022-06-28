const mongoose = require("mongoose");
const router = require("express").Router();
const Agenda = require("../models/agenda.model");
const create_error = require("http-errors");

router.post("/agendar", async (req, res, next) => {
  try {
    const agenda = new Agenda(req.body);
    const resultado = await agenda.save();
    if (!resultado)
      return res.status(500).json({ error: "Erro ao salvar agenda" });
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


// fetch all agendas
router.get("/", async (req, res, next) => { 

  try {
    const agendas = await Agenda.find();
    if (!agendas)
      return res.status(500).json({ error: "Erro ao buscar agendas" });
    return res.status(200).json(agendas);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  
} // end get all agendas

})

// procurar dos dias desocupados
router.get("/", async (req, res, next) => {
  try {
    const agenda = await Agenda.find({
      horarios: { $elemMatch: { ocupado: true } },
    });
    if (!agenda)
      return res.status(404).json({ error: "Agenda não encontrada" });
    return res.status(200).json(agenda);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});



///Liberar um horario para um dia especifico
router.patch("/ocupar/:dia/:hora", async (req, res, next) => {
  try {
    //update ocupado to false  to specific hora
    const agenda = await Agenda.updateOne(
      { dia: req.params.dia, "horarios.hora": req.params.hora },
      { $set: { "horarios.$.ocupado": true } },
      { new: true }
    );
    if (!agenda)
      return res.status(404).json({ error: "Agenda não encontrada" });
    console.log(agenda);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


///Buscar os horarios pra um dia especifico
router.get("/:dia", async (req, res, next) => {

  // extrair somente a ano/mes/dia
  
  
  try {
    const agenda = await Agenda.findOne({ dia: req.params.dia });
    if (!agenda) {
      return res.json([])
    }
    return res.status(200).json(agenda.horarios);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
