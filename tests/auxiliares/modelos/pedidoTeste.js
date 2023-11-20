const pedidoTesteCompleto = {
    cliente_id: Number,
    observacao: String,
    pedido_produtos: [

    ]
};

const pedidoTesteCamposObrigatorios = {
    cliente_id: Number,
    observacao: String,
    pedido_produtos: [

    ]
};

const pedidoTesteClienteInexistente = {
    cliente_id: Number,
    observacao: String,
    pedido_produtos: [

    ]
};

const pedidoTesteProdutoInexistente = {
    cliente_id: Number,
    observacao: String,
    pedido_produtos: [

    ]
};

const pedidoTesteQuantidadeInexistente = {
    cliente_id: Number,
    observacao: String,
    pedido_produtos: [

    ]
};

module.exports = {
    pedidoTesteCompleto,
    pedidoTesteCamposObrigatorios,
    pedidoTesteClienteInexistente,
    pedidoTesteProdutoInexistente,
    pedidoTesteQuantidadeInexistente
};