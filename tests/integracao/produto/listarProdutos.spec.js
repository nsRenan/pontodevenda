const request = require("supertest");
const app = require("../../../src/servidor");

const { ps5, xboxOne, nintendoSwitch, leiteSemLactose } = require('../../auxiliares/modelos/produtoTeste');
const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarProtudosTeste = require('../../auxiliares/metodos/cadastrarProtudosTeste');

describe("Testando o listar os produtos cadastrados - Integração", () => {
  let token = null;
  beforeAll(async () => {
    token = await gerarToken();
    await cadastrarProtudosTeste(token);
  });

  afterAll(async () => {
    await limparDadosDoBancoDeDados();
  });

  test("Deve listar todos os produtos com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .get(`/produto`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          id: expect.any(Number),
          descricao: ps5.descricao,
          quantidade_estoque: ps5.quantidade_estoque,
          valor: ps5.valor,
          categoria_id: ps5.categoria_id,
          produto_imagem: null,
        },
        {
          id: expect.any(Number),
          descricao: xboxOne.descricao,
          quantidade_estoque: xboxOne.quantidade_estoque,
          valor: xboxOne.valor,
          categoria_id: xboxOne.categoria_id,
          produto_imagem: null,
        },
        {
          id: expect.any(Number),
          descricao: nintendoSwitch.descricao,
          quantidade_estoque: nintendoSwitch.quantidade_estoque,
          valor: nintendoSwitch.valor,
          categoria_id: nintendoSwitch.categoria_id,
          produto_imagem: null,
        },
      ])
    );
  });
  test("Deve listar todos os produtos da categoria 9 com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .get(`/produto?categoria_id=9`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          id: expect.any(Number),
          descricao: ps5.descricao,
          quantidade_estoque: ps5.quantidade_estoque,
          valor: ps5.valor,
          categoria_id: ps5.categoria_id,
          produto_imagem: null,
        },
      ])
    );
  });
  test("Deve listar todos os produtos da categoria 4 com sucesso e retornar 200.", async () => {
    const response = await request(app)
      .get(`/produto?categoria_id=4`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          id: expect.any(Number),
          descricao: leiteSemLactose.descricao,
          quantidade_estoque: leiteSemLactose.quantidade_estoque,
          valor: leiteSemLactose.valor,
          categoria_id: leiteSemLactose.categoria_id,
          produto_imagem: null,
        },
      ])
    );
  });
  test("Deve listar um array vazio por não conter nenhum produto cadastrado na categoria e retornar 200", async () => {
    const response = await request(app)
      .get(`/produto?categoria_id=28`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test("Não deve listar os produtos por categoria invalida e retornar 400.", async () => {
    const response = await request(app)
      .get(`/produto?categoria_id=vinte`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
  test("Deve listar um array vazio por não conter nenhum produto cadastrado na categoria e retornar 200.", async () => {
    const response = await request(app)
      .get(`/produto?categoria_id=1`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
