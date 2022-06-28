const mongoose = require('mongoose');
const router = require('express').Router();
const Usuario = require('../models/Usuario.model');
const create_error = require('http-errors');



router.get('/:usuarioId', async (req, res, next) => {
    
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            next(create_error(404, 'Usuário não encontrado'))
        }
        res.json(usuario);
        
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    
    
    try {
        const usuarios = await Usuario.find()
        if(usuarios.length === 0){
            next(create_error(404, 'Nenhum usuário encontrado'))
        }
        return res.json(usuarios);
    } catch (error) {
        // console.log("o erro:  "+error)
        // next(error)
        res.status(500).json({error: error})
    }
})


router.post('/cadastrar', async (req, res, next) => { 
    try {
        const usuario = new Usuario(req.body);
        const usuarioSalvo = await usuario.save();
        if (!usuarioSalvo) next(create_error(400, 'Erro ao salvar usuário'))
        
        return res.json(usuarioSalvo);
    } catch (error) {
        next(error)
    }
});

router.patch('/:usuarioId', async (req, res, next) => {
    
    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.usuarioId, req.body, { new: true });
        if (!usuarioAtualizado) next(create_error(400, 'Erro ao atualizar usuário'))
        return res.json(usuarioAtualizado);
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;