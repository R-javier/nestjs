import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsController } from './starwars.controller';
import { StarWarsService } from './starwars.service';
import type { StarWarsCharacter } from './starwars.service';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';


describe('StarWarsController', () => {
    let app: INestApplication;

    describe('Test 1: endpoint /starwars/characters responde correctamente', () => {
        beforeEach(async () => {
            const moduleRef: TestingModule = await Test.createTestingModule({
                controllers: [StarWarsController],
                providers: [StarWarsService],
            }).compile();

            app = moduleRef.createNestApplication();
            await app.init();
        });

        afterEach(async () => {
            await app.close();
        });
        
        it('GET /starwars/characters - 200 y devuelve un array de personajes', async () => {
            const response = await request(app.getHttpServer())
                .get('/starwars/characters')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            const first: StarWarsCharacter = response.body[0];
            expect(first).toHaveProperty('name');
            expect(first).toHaveProperty('side');
        });
    })

    it('GET /starwars/characters devuelve distintos personajes en distintos requests)', async () => {
        const response1 = await request(app.getHttpServer())
            .get('/starwars/characters')
            .expect(200);
        const response2 = await request(app.getHttpServer())
            .get('/starwars/characters')
            .expect(200);

        expect(response1.body[0]).toHaveProperty('name');
        expect(response2.body[0]).toHaveProperty('name');


    })
});