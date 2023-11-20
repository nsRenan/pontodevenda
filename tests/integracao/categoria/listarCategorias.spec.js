const request = require('supertest');
const app = require('../../../src/servidor');


describe("Testando a listagem de categorias - Integração", () => {

    test('Deve retornar status 200 e uma lista de categorias', async () => {
        const response = await request(app).get('/categoria');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    descricao: expect.any(String)
                })
            ])
        );
    });
});