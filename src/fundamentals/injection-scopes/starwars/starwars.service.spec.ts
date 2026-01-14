import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsService } from './starwars.service';

describe('StarWarsService', () => {
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            providers: [StarWarsService],
        }).compile();
    });

    it('debe poder resolverse', async () => {
        const service = await moduleRef.resolve(StarWarsService);

        expect(service).toBeDefined();

        const characters = service.getStarWarsCharacters();
        expect(Array.isArray(characters)).toBe(true);
        expect(characters.length).toBeGreaterThan(0);
        expect(characters[0]).toHaveProperty('name');
        expect(characters[0]).toHaveProperty('side');
    });
})