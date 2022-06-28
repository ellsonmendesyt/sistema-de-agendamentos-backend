const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    cpf: {
        type: String,
        required: [true, 'CPF é obrigatório'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true
    },
    nascimento: {
        type: Date,
        required: [true, 'Data de nascimento é obrigatória']  
    },
    telefone: {
        type: String,
        required: [true, 'Telefone é obrigatório']
    },
    endereco: {
        type: String
    }

}, { timestamps: true });

module.exports= mongoose.model('Usuario', UsuarioSchema);