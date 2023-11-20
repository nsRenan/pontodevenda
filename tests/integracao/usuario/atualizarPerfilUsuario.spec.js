const request = require('supertest');
const app = require('../../../src/servidor');

const gerarToken = require('../../auxiliares/metodos/gerarToken')
const { usuarioTesteParaAtualizar, usuarioTesteCompleto } = require('../../auxiliares/modelos/usuarioTeste')
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const { after } = require('node:test');

let token = null;

describe("Testando a atualização de usuários - Integração", () => {
    beforeAll(async () => {
        token = await gerarToken()
    });
    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });
    test("Deve atualizar o nome do usuário com sucesso e retornar 200.", async () => {
        const response = await request(app)
            .put("/usuario")
            .set("Authorization", `Bearer ${token}`)
            .send(
                {
                    nome: usuarioTesteParaAtualizar.nome,
                    email: usuarioTesteCompleto.email,
                    senha: usuarioTesteCompleto.senha
                }
            );
        expect(response.status).toBe(200);
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
    test("Deve atualizar o email do usuário com sucesso e retornar 200.", async () => {
        const response = await request(app)
            .put("/usuario")
            .set("Authorization", `Bearer ${token}`)
            .send(
                {
                    nome: usuarioTesteParaAtualizar.nome,
                    email: usuarioTesteParaAtualizar.email,
                    senha: usuarioTesteCompleto.senha
                }
            );
        expect(response.status).toBe(200);
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
    test("Deve atualizar a senha do usuário com sucesso e retornar 200.", async () => {
        const response = await request(app)
            .put("/usuario")
            .set("Authorization", `Bearer ${token}`)
            .send(
                {
                    nome: usuarioTesteParaAtualizar.nome,
                    email: usuarioTesteParaAtualizar.email,
                    senha: usuarioTesteParaAtualizar.senha
                }
            );
        expect(response.status).toBe(200);
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
    test("Não deve atualizar o usuário sem informar o token e deve retornar 401.", async () => {
        const response = await request(app)
            .put("/usuario")
            .set("Authorization", '')
            .send(
                {
                    nome: usuarioTesteParaAtualizar.nome,
                    email: usuarioTesteParaAtualizar.email,
                    senha: usuarioTesteParaAtualizar.senha
                });
        expect(response.status).toBe(401);
    });
});