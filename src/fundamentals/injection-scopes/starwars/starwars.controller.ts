import { Controller, Get } from '@nestjs/common';
import { StarWarsService } from './starwars.service';
import type { StarWarsCharacter } from './starwars.service';

@Controller('starwars')
export class StarWarsController {
    constructor(private readonly starWarsService: StarWarsService) { }

    @Get('characters')
    getCharacters(): Array<StarWarsCharacter> {
        return this.starWarsService.getStarWarsCharacters();
    }

}