const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
    servico: {
        type: String,
        required: [true, 'Serviço é obrigatório'],
    },
    data: {
        type: Date,
        required: [true, 'Data é obrigatória']
    },
    horario: {
        type: String,
        required: [true, 'Horário é obrigatório']
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Cliente é obrigatório']
    },
    status: {
        type: String,
        required: [true, 'Status é obrigatório'],
        default: 'Pendente',
        enum: ['pendente', 'confirmado', 'cancelado','regendado']
    }
}, { timestamps: true });

module.exports= mongoose.model('Agendamento', AgendamentoSchema);