const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const knex = require('../../../../src/bancodedados/conexao');
const { verificarEmailDuplicado } = require('../../../../src/intermediarios/validacoes');

const usuarioTeste = {
    nome: `Teste ${uuid.v4()}`,
    email: `teste${uuid.v4()}@gmail.com`,
    senha: "123456"
}

let token = null;

describe("Testando a atualização de usuários - Integração", () => {
    beforeAll(async () => {
        const usuarioCadastrado = await knex.insert(usuarioTeste).table("usuarios").returning(["id"]);
        token = jwt.sign({ id: usuarioCadastrado[0].id }, process.env.CHAVE_SECRETA);

    });

    afterAll(async () => {
        await knex.delete().table("usuarios");
    });

    test("Deve informar que o email já existe retorar status code 403", async () => {
        const req = {
            headers: { Authorization: `Bearer ${token}` },
            body: { email: usuarioTeste.email }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        const next = jest.fn();
        await verificarEmailDuplicado(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    test("Deve seguir o fluxo e passar para o proximo middleware.", async () => {
        const req = {
            headers: { Authorization: `Bearer ${token}` },
            body: { email: `teste${uuid.v4()}@gmail.com` }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        const next = jest.fn();
        await verificarEmailDuplicado(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});