const request = require("supertest");

const app = require("../../../src/servidor");

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');

const produto = require('../../auxiliares/modelos/produtoTeste');

describe("Testando o cadastro de um produto - Integração", () => {
  let token;

  beforeAll(async () => {
    token = await gerarToken();
  });

  afterAll(async () => {
    await limparDadosDoBancoDeDados();
  });

  test("Deve cadastrar o produto com sucesso e retornar 201.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send(produto.ps5);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          id: expect.any(Number),
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
          produto_imagem: null,
        },
      ])
    );
  });
  test("Não deve cadastrar o produto por falta da descrição e retornar 400.", async () => {

    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send(
        {
          quantidade_estoque: produto.ps5.quantidade_estoque,
          valor: produto.ps5.valor,
          categoria_id: produto.ps5.categoria_id,
        }
      );

    expect(response.status).toBe(400);
  });
  test("Não deve cadastrar o produto por falta da quantidade de estoque  e retornar 400.", async () => {

    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        valor: produto.ps5.valor,
        categoria_id: produto.ps5.categoria_id,
      });

    expect(response.status).toBe(400);
  });
  test("Não deve cadastrar o produto por falta do valor  e retornar 400.", async () => {

    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        categoria_id: produto.ps5.categoria_id,
      });

    expect(response.status).toBe(400);
  });

  test("Não deve cadastrar o produto por falta da categoria  e retornar 400.", async () => {

    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: produto.ps5.valor,
      });
    expect(response.status).toBe(400);
  });


  test("Não deve cadastrar o produto por estoque negativo  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: "-1",
        valor: produto.ps5.valor,
        categoria_id: produto.ps5.categoria_id,
      });
    expect(response.status).toBe(400);
  });



  test("Não deve cadastrar o produto por valor negativo  e retornar 400.", async () => {

    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: "-1",
        categoria_id: produto.ps5.categoria_id,
      });

    expect(response.status).toBe(400);
  });

  test("Não deve cadastrar o produto por valor fracionado  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: "1.5",
        categoria_id: produto.ps5.categoria_id,
      });
    expect(response.status).toBe(400);
  });

  test("Não deve cadastrar o produto por estoque fracionado  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: "1.5",
        valor: produto.ps5.valor,
        categoria_id: produto.ps5.categoria_id,
      });

    expect(response.status).toBe(400);
  });

  test("Não deve cadastrar o produto por categoria invalida  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: produto.ps5.valor,
        categoria_id: "91.22",
      });
    expect(response.status).toBe(400);
  });
  test("Não deve cadastrar o produto por categoria invalida  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: produto.ps5.valor,
        categoria_id: "91",
      });
    expect(response.status).toBe(400);
  });
  test("Não deve cadastrar o produto por valor invalido  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: "",
        categoria_id: "91.22",
      });
    expect(response.status).toBe(400);
  });
  test("Não deve cadastrar o produto por quantidade invalida  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: produto.ps5.descricao,
        quantidade_estoque: "",
        valor: produto.ps5.valor,
        categoria_id: "91.22",
      });

    expect(response.status).toBe(400);
  });
  test("Não deve cadastrar o produto por descição invalida  e retornar 400.", async () => {
    const response = await request(app)
      .post(`/produto`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "",
        quantidade_estoque: produto.ps5.quantidade_estoque,
        valor: produto.ps5.valor,
        categoria_id: "91.22",
      });
    expect(response.status).toBe(400);
  });

});