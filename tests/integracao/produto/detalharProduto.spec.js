const request = require("supertest");
const app = require("../../../src/servidor");

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarProtudosTeste = require('../../auxiliares/metodos/cadastrarProtudosTeste');

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

  test("Deve retornar status 200 ao detalhar produto do usuario", async () => {
    const response = await request(app)
      .get(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        descricao: expect.any(String),
        quantidade_estoque: expect.any(Number),
        valor: expect.any(Number),
        categoria_id: expect.any(Number),
      })
    );
  });

  test("Deve retornar status 401 ao detalhar produto sem informar o token", async () => {
    const response = await request(app)
      .get(`/produto/${produtosCadastrados[0]}`)
      .set("Authorization", "");
    expect(response.status).toBe(401);
  });

  test("Deve retornar status 404 ao detalhar produto com id inexistente", async () => {
    const response = await request(app)
      .get(`/produto/${produtosCadastrados[0] - 2}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com id em decimal", async () => {
    const response = await request(app)
      .get("/produto/1.1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com id cujo decimal é 0", async () => {
    const response = await request(app)
      .get("/produto/1.0")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com id negativo", async () => {
    const response = await request(app)
      .get("/produto/-1}")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com numeros grandes", async () => {
    const response = await request(app)
      .get("/produto/285081509438123123123523}")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com numeros que possuem virgula", async () => {
    const response = await request(app)
      .get("/produto/1,2,3,4124,4,1}")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com numeros que possuem espaços", async () => {
    const response = await request(app)
      .get("/produto/1 1 2 3}")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("Deve retornar status 404 ao detalhar produto com numeros que possuem letras", async () => {
    const response = await request(app)
      .get("/produto/1abc12}")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});
