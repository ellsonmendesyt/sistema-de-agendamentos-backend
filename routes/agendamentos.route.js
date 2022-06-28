const mongoose = require('mongoose');
const router = require('express').Router();
const Agendamento = require('../models/agendamento.model');
const create_error = require('http-errors');


router.post("/criar", async (req, res, next) => {
    try {
        const agendamento = new Agendamento(req.body);
        const agendamentoSalvo = await agendamento.save();
        if (!agendamentoSalvo) next(create_error(400, 'Erro ao salvar agendamento'))
        return res.json(agendamentoSalvo);
    } catch (error) {
        next(error)
    }
})


router.get("/listar", async (req, res, next) => {
    try {
        const agendamentos = await Agendamento.find().select(" -__v").populate('cliente',{ __v: 0,senha:0 })
        if (agendamentos.length === 0) next(create_error(404, 'Nenhum agendamento encontrado'))
        return res.json(agendamentos);

    } catch (error) {
        next(error)
    }
})


module.exports = router;