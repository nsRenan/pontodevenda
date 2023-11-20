const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const knex = require('../../../../src/bancodedados/conexao');
const { validarAutenticacao } = require('../../../../src/intermediarios/autenticação');

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

    test("Deve permitir o acesso quando o usuário está autenticado", async () => {
        const req = { headers: { Authorization: `Bearer ${token}` } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        const next = jest.fn();
        await validarAutenticacao(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });

    test("Não deve permitir o acesso quando o usuário não está autenticado", async () => {
        const req = { headers: { Authorization: '' } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        const next = jest.fn();
        await validarAutenticacao(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});