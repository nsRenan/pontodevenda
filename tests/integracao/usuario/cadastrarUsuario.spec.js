const request = require('supertest');
const app = require('../../../src/servidor');

const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const {
    usuarioTesteCompleto,
    usuarioTesteSemEmail,
    usuarioTesteSemNome,
    usuarioTesteSemSenha,
    usuarioTesteEmailInvalido,
    usuarioTesteEmailDuplicado,
    usuarioTesteSemConteudo } = require('../../auxiliares/modelos/usuarioTeste');


describe("Testando a criação de usuários - Integração", () => {
    beforeAll(async () => {
        await limparDadosDoBancoDeDados();
    });
    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });
    test("Deve ser criado um usuario com sucesso e retonar 201.", async () => {
        const response = await request(app).post("/usuario").send(usuarioTesteCompleto);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining([
                {
                    id: expect.any(Number),
                    nome: expect.any(String),
                    email: expect.any(String),
                }
            ])
        );

    });

    test("Não deve ser criado um usuario com um email existente no banco de dados. Retorna erro 403.", async () => {
        await request(app).post("/usuario").send(usuarioTesteEmailDuplicado);
        const response = await request(app).post("/usuario").send(usuarioTesteEmailDuplicado);
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });


    test("Não deve ser criado um usuario com o campo 'nome' ausente. Retorna erro 403.", async () => {
        const response = await request(app).post("/usuario").send(usuarioTesteSemNome);
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um usuario com o campo 'email' ausente. Retorna erro 403.", async () => {
        const response = await request(app).post("/usuario").send(usuarioTesteSemEmail);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um usuario com o campo 'senha' ausente. Retorna erro 403.", async () => {
        const response = await request(app).post("/usuario").send(usuarioTesteSemSenha);
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um usuario com um email de formato invalido. Retorna erro 403.", async () => {
        const response = await request(app).post("/usuario").send(usuarioTesteEmailInvalido);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um usuario com o corpo da requisição vazia. Retorna erro 403.", async () => {
        const response = await request(app).post("/usuario")
            .send(usuarioTesteSemConteudo);
        expect(response.status).toBe(400);
    });
});