const request = require('supertest');
const app = require('../../../src/servidor');

const cadastrarUsuarioTeste = require('../../auxiliares/metodos/cadastrarUsuarioTeste');

const {
    usuarioTesteSemEmail,
    usuarioTesteSemSenha,
    usuarioTesteEmailInvalido,
    usuarioTesteSenhaInvalida,
    usuarioTesteEmailNaoCadastrado,
} = require('../../auxiliares/modelos/usuarioTeste');

describe("Testando login de usuário - Integração", () => {
    let usuarioTesteLogado;
    beforeAll(async () => {
        usuarioTesteLogado = await cadastrarUsuarioTeste();
    });

    test("Deve realizar o login do usuario e retornar o token e status code 200", async () => {

        const response = await request(app).post("/login").send({
            email: usuarioTesteLogado.email,
            senha: usuarioTesteLogado.senha
        });
        expect(response.body).toEqual(
            expect.objectContaining(
                {
                    usuario: expect.objectContaining({
                        id: expect.any(Number),
                        nome: expect.any(String),
                        email: expect.any(String)
                    }),
                    token: expect.any(String)
                }
            ));
    });


    test("Não deve realizar o login do usuario com o campo 'email' ausente. Status code 403", async () => {
        const response = await request(app).post("/login").send(
            {
                email: usuarioTesteSemEmail.email,
                senha: usuarioTesteLogado.senha
            }
        );

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test("Não deve realizar o login do usuario com o campo 'senha' ausente. Status code 403", async () => {

        const response = await request(app).post("/login").send({
            email: usuarioTesteLogado.email,
            senha: usuarioTesteSemSenha.senha
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });


    test("Não deve realizar o login do usuario com o campo 'email' em formato incorreto. Status code 403", async () => {
        const response = await request(app).post("/login").send({
            email: usuarioTesteEmailInvalido.email,
            senha: usuarioTesteLogado.senha
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });
    test("Não deve realizar o login do usuario com o campo 'senha' incorreto. Status code 403", async () => {

        const response = await request(app).post("/login").send({
            email: usuarioTesteLogado.email,
            senha: usuarioTesteSenhaInvalida.senha
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test("Não deve realizar o login do usuario com um email não cadastrado Status code 403", async () => {
        const response = await request(app).post("/login").send({
            email: usuarioTesteEmailNaoCadastrado.email,
            senha: usuarioTesteEmailNaoCadastrado.senha
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });
});