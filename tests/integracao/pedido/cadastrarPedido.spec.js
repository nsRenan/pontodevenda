const request = require('supertest');
const app = require('../../../src/servidor');

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarClienteTeste = require('../../auxiliares/metodos/cadastrarClienteTeste');
const cadastrarProtudosTeste = require('../../auxiliares/metodos/cadastrarProtudosTeste');

const {
  pedidoTesteCompleto,
  pedidoTesteCamposObrigatorios,
  pedidoTesteClienteInexistente,
  pedidoTesteProdutoInexistente,
  pedidoTesteQuantidadeInexistente
} = require('../../auxiliares/modelos/pedidoTeste');

describe('Testando o cadastro de pedido - Integração', () => {
  let token;
  let iDcliente;
  let produtosCadastrados;

  beforeAll(async () => {
    token = await gerarToken()
    iDcliente = await cadastrarClienteTeste(token);
    produtosCadastrados = await cadastrarProtudosTeste(token);
  });

  afterAll(async () => {
    await limparDadosDoBancoDeDados();
  });

  test('Deve cadastrar o pedido e retornar status 201', async () => {
    pedidoTesteCompleto.cliente_id = iDcliente;

    pedidoTesteCompleto.observacao = 'Pedido de teste';
    pedidoTesteCompleto.pedido_produtos.push(
      {
        produto_id: produtosCadastrados[0],
        quantidade_produto: 1
      },
      {
        produto_id: produtosCadastrados[1],
        quantidade_produto: 1
      }
    );
    const resposta = await request(app)
      .post('/pedido')
      .set('Authorization', `Bearer ${token}`)
      .send(pedidoTesteCompleto);

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String)
      }),
    );
  });

  test('Deve cadastrar o pedido sem informar o campo de observacao e retornar status 201', async () => {
    pedidoTesteCamposObrigatorios.cliente_id = iDcliente;

    pedidoTesteCamposObrigatorios.pedido_produtos.push(
      {
        produto_id: produtosCadastrados[0],
        quantidade_produto: 1
      },
      {
        produto_id: produtosCadastrados[1],
        quantidade_produto: 1
      }
    );

    const resposta = await request(app)
      .post('/pedido')
      .set('Authorization', `Bearer ${token}`)
      .send(pedidoTesteCamposObrigatorios);

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String)
      }),
    );
  });

  test('Não deve cadastrar o pedido informando id de cliente que não existe e deve retornar status 400', async () => {
    pedidoTesteClienteInexistente.cliente_id = 9999
    pedidoTesteClienteInexistente.observacao = 'Pedido de teste';

    pedidoTesteClienteInexistente.pedido_produtos.push(
      {
        produto_id: produtosCadastrados[0],
        quantidade_produto: 1
      },
      {
        produto_id: produtosCadastrados[1],
        quantidade_produto: 1
      }
    );

    const resposta = await request(app)
      .post('/pedido')
      .set('Authorization', `Bearer ${token}`)
      .send(pedidoTesteClienteInexistente);

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        mensagem: expect.any(String)
      }),
    );
  });

  test('Não deve cadastrar o pedido informando id de produto que não existe e deve retornar status 400', async () => {
    pedidoTesteProdutoInexistente.cliente_id = iDcliente;
    pedidoTesteProdutoInexistente.observacao = 'Pedido de teste';

    pedidoTesteProdutoInexistente.pedido_produtos.push(
      {
        produto_id: 9999,
        quantidade_produto: 1
      },
      {
        produto_id: produtosCadastrados[1],
        quantidade_produto: 1
      }
    );

    const resposta = await request(app)
      .post('/pedido')
      .set('Authorization', `Bearer ${token}`)
      .send(pedidoTesteProdutoInexistente);
    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        erros: expect.arrayContaining([
          expect.objectContaining({
            mensagem: expect.any(String)
          })
        ])
      }),
    );
  });

  test('Não deve cadastrar o pedido informando quantidade de produto maior que a quantidade em estoque e deve retornar status 400', async () => {
    pedidoTesteQuantidadeInexistente.cliente_id = iDcliente;
    pedidoTesteQuantidadeInexistente.observacao = 'Pedido de teste';

    pedidoTesteQuantidadeInexistente.pedido_produtos.push(
      {
        produto_id: produtosCadastrados[0],
        quantidade_produto: 9999
      },
      {
        produto_id: produtosCadastrados[1],
        quantidade_produto: 1
      }
    );
    const resposta = await request(app)
      .post('/pedido')
      .set('Authorization', `Bearer ${token}`)
      .send(pedidoTesteQuantidadeInexistente);

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual(
      expect.objectContaining({
        erros: expect.arrayContaining([
          expect.objectContaining({
            mensagem: expect.any(String)
          })
        ])
      }),
    );
  });
}); 