import { Injectable, Scope } from '@nestjs/common';

export type StarWarsCharacter = {
    name: string;
    side: string;
};


@Injectable({ scope: Scope.REQUEST })
export class StarWarsService {

    private characters: StarWarsCharacter[] = [
        { name: 'Luke Skywalker', side: 'light' },
        { name: 'Darth Vader', side: 'dark' },
        { name: 'Leia Organa', side: 'light' },
        { name: 'Emperor Palpatine', side: 'dark' },
        { name: 'Han Solo', side: 'light' },
        { name: 'Darth Maul', side: 'dark' }

    ]

    private readonly chosen: StarWarsCharacter;

    constructor() {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        this.chosen = this.characters[randomIndex];
        //console.log(`Personaje elegido para esta solicitud:: ${this.chosen.name} (${this.chosen.side} side)`);
    }

    getStarWarsCharacters(): Array<StarWarsCharacter> {
        return this.characters
    }

    getChosen(): StarWarsCharacter {
        return this.chosen;
    }
}