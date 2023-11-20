const request = require("supertest");
const app = require("../../../src/servidor");

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarProtudosTeste = require('../../auxiliares/metodos/cadastrarProtudosTeste');

const produto = require('../../auxiliares/modelos/produtoTeste');

describe("Testando a atualização de produtos - Integração", () => {
  let token = null;
  let produtosCadastrados = null;
  beforeAll(async () => {
    token = await gerarToken();
    produtosCadastrados = await cadastrarProtudosTeste(token);
  });

  afterAll(async () => {
    await limparDadosDoBancoDeDados();
  });

  test("Deve atualizar o produto com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send(produto.ps5);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
          produto_imagem: null,
          id: expect.any(Number),
        },
      ])
    );
  });

  test("Deve atualizar a descricao com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send(
        {
          descricao: "Playstation 5",
          quantidade_estoque: produto.ps5.quantidade_estoque,
          valor: produto.ps5.valor,
          categoria_id: produto.ps5.categoria_id,
        }
      );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
          produto_imagem: null,
          id: expect.any(Number),
        },
      ])
    );
  });

  test("Deve atualizar o estoque com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Playstation 5",
        quantidade_estoque: 100,
        valor: produto.ps5.valor,
        categoria_id: produto.ps5.categoria_id,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
          produto_imagem: null,
          id: expect.any(Number),
        },
      ])
    );
  });

  test("Deve atualizar o valor com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Playstation 5",
        quantidade_estoque: 100,
        valor: 200000,
        categoria_id: produto.ps5.categoria_id,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
          produto_imagem: null,
          id: expect.any(Number),
        },
      ])
    );
  });

  test("Não Deve atualizar o valor em decimal com sucesso e retornar 400.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Playstation 5",
        quantidade_estoque: 100,
        valor: produto.ps5.valor + 0.5,
        categoria_id: produto.ps5.categoria_id,
      });
    expect(response.status).toBe(400);
  });

  test("Deve atualizar a categoria com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Playstation 5",
        quantidade_estoque: 100,
        valor: 200000,
        categoria_id: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
          produto_imagem: null,
          id: expect.any(Number),
        },
      ])
    );
  });

  test("Não deve atualizar o produto sem informar o token e deve retornar 401.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", "")
      .send(produto.ps5);
    expect(response.status).toBe(401);
  });

  test("Não deve atualizar o produto caso os numeros sejam negativos.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "iphone",
        quantidade_estoque: -1,
        valor: -1,
        categoria_id: 1,
      });
    expect(response.status).toBe(400);
  });

  test("Não deve atualizar o produto caso a quantidade seja um decimal.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "iphone",
        quantidade_estoque: 1.5,
        valor: 10,
        categoria_id: 1,
      });
    expect(response.status).toBe(400);
  });

  test("Não deve atualizar o produto caso a categoria seja invalida.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "iphone",
        quantidade_estoque: 1,
        valor: 1,
        categoria_id: 55,
      });
    expect(response.status).toBe(404);
  });

  test("Deve (ou nao deve?) atualizar o produto caso a categoria seja um decimal terminado em 0.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "iphone",
        quantidade_estoque: 1.0,
        valor: 1.0,
        categoria_id: 1.0,
      });
    expect(response.status).toBe(200);
  });

  test("Não deve atualizar o produto caso o numero seja muito grande.", async () => {
    const response = await request(app)
      .put(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "iphone",
        quantidade_estoque: 111111111111111111111,
        valor: 111111111111111111111,
        categoria_id: 1,
      });
    expect(response.status).toBe(400);
  });
});
