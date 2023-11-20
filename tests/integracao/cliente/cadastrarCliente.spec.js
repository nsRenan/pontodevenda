const request = require('supertest');
const app = require('../../../src/servidor');

const gerarToken = require('../../auxiliares/metodos/gerarToken');

const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');

const {
    clienteTeste,
    clienteTesteSemConteudo,
    clienteTesteEmailInvalido,
    clienteCamposObrigatorios,
    clienteCamposObrigatoriosNaoPreenchidos,
    clienteEmailExistente,
    clienteCpfExistente
} = require('../../auxiliares/modelos/clienteTeste');

describe('Testando o cadastro de clientes - Integração', () => {
    let token;
    beforeAll(async () => {
        token = await gerarToken();

    });

    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });

    test('Deve ser criado um cliente com sucesso e retornar 201.', async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send(clienteTeste);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining(
                {
                    id: expect.any(Number),
                    nome: expect.any(String),
                    email: expect.any(String),
                    cpf: expect.any(String),
                    cep: expect.any(String),
                    rua: expect.any(String),
                    numero: expect.any(String),
                    bairro: expect.any(String),
                    cidade: expect.any(String),
                    estado: expect.any(String),
                }
            )
        );
    });

    test('Deve ser criado um cliente com sucesso apenas com os campos obrigatórios e retornar 201.', async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send(clienteCamposObrigatorios);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining(
                {
                    id: expect.any(Number),
                    nome: expect.any(String),
                    email: expect.any(String),
                    cpf: expect.any(String),
                    cep: expect.any(String),
                    rua: expect.any(String),
                    numero: expect.any(String),
                    bairro: expect.any(String),
                    cidade: expect.any(String),
                    estado: expect.any(String),
                }
            )
        );
    });

    test('Não deve ser criado um cliente com o campo nome ausente e retornar 400.', async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send({
            nome: clienteCamposObrigatoriosNaoPreenchidos.nome,
            email: clienteTeste.email,
            cpf: clienteTeste.cpf
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test('Não deve ser criado um cliente com o campo email ausente e retornar 400.', async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send({
            nome: clienteTeste.nome,
            email: clienteCamposObrigatoriosNaoPreenchidos.email,
            cpf: clienteTeste.cpf
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test('Não deve ser criado um cliente com o campo cpf ausente e retornar 400.', async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send({
            nome: clienteTeste.nome,
            email: clienteTeste.email,
            cpf: clienteCamposObrigatoriosNaoPreenchidos.cpf
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um cliente com um email existente no banco de dados e retornar 403.", async () => {
        await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send(clienteEmailExistente);
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send(clienteEmailExistente);
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um cliente com um cpf existente no banco de dados e retornar 403.", async () => {
        await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send(clienteCpfExistente);
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send(clienteCpfExistente);
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um cliente com um email de formato invalido e retornar 400", async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`).send({
            nome: clienteTeste.nome,
            email: clienteTesteEmailInvalido.email,
            cpf: clienteTeste.cpf
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                { mensagem: expect.any(String) }
            )
        );
    });

    test("Não deve ser criado um cliente com o corpo da requisição vazia e retornar 400.", async () => {
        const response = await request(app).post('/cliente').set("Authorization", `Bearer ${token}`)
            .send(clienteTesteSemConteudo);
        expect(response.status).toBe(400);
    })
})
