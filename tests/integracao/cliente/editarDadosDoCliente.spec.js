const request = require('supertest');
const app = require('../../../src/servidor');

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarClienteTeste = require('../../auxiliares/metodos/cadastrarClienteTeste');

const {
    clienteTeste,
    clienteTesteParaAtualizar,
    clienteTesteSemNome,
    clienteTesteSemEmail,
    clienteTesteCompletoEmailInvalido,
    clienteTesteCPFInvalido,
    clienteTesteCEPInvalido
} = require('../../auxiliares/modelos/clienteTeste');


describe('Testando a edição de dados do cliente - Integração', () => {
    let token = null;
    let idClienteTeste;

    beforeAll(async () => {
        token = await gerarToken();
        idClienteTeste = await cadastrarClienteTeste(token);
    });

    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });

    test('Não deve editar o nome caso esteja vazio e deve retornar 400', async () => {
        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteSemNome);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test('Não deve editar o email caso esteja vazio e deve retornar 400', async () => {
        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteSemEmail);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test('Não deve editar o email caso seja inválido e deve retornar 400', async () => {
        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteCompletoEmailInvalido);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test('Não deve editar o cpf caso seja inválido e deve retornar 400', async () => {
        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteCPFInvalido);

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test('Não deve editar o cep caso seja inválido e deve retornar 400', async () => {
        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteCEPInvalido);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            ));
    });

    test('Não deve editar os dados do cliente sem informar o token e deve retornar 401', async () => {
        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', '')
            .send(clienteTeste);

        expect(response.status).toBe(401);
    });

    test('Deve editar o nome do cliente com sucesso e retornar 200', async () => {

        clienteTesteParaAtualizar.nome = 'Helio';

        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteParaAtualizar);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining([{
                id: expect.any(Number),
                nome: expect.any(String),
                email: expect.any(String),
                cpf: expect.any(String),
                cep: expect.any(String),
                rua: expect.any(String),
                numero: expect.any(String),
                bairro: expect.any(String),
                cidade: expect.any(String),
                estado: expect.any(String)
            }])
        );
    });

    test('Deve editar o email do cliente com sucesso e retornar 200', async () => {
        clienteTesteParaAtualizar.email = 'helio@outlook.com'

        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteParaAtualizar);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining([{
                id: expect.any(Number),
                nome: expect.any(String),
                email: expect.any(String),
                cpf: expect.any(String),
                cep: expect.any(String),
                rua: expect.any(String),
                numero: expect.any(String),
                bairro: expect.any(String),
                cidade: expect.any(String),
                estado: expect.any(String)
            }])
        );
    });

    test('Deve editar o cpf do cliente com sucesso e retornar 200', async () => {
        clienteTesteParaAtualizar.cpf = '99999999999';

        const response = await request(app)
            .put(`/cliente/${idClienteTeste}`)
            .set('Authorization', `Bearer ${token}`)
            .send(clienteTesteParaAtualizar);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining([{
                id: expect.any(Number),
                nome: expect.any(String),
                email: expect.any(String),
                cpf: expect.any(String),
                cep: expect.any(String),
                rua: expect.any(String),
                numero: expect.any(String),
                bairro: expect.any(String),
                cidade: expect.any(String),
                estado: expect.any(String)
            }])
        );
    });
});