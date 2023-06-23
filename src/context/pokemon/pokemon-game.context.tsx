import { createContextId } from '@builder.io/qwik';
//import { usePokemonId } from '../../routes/pokemon/[id]/index';


export interface PokemonGameState {
    pokemonId : number;
    showBackImage: boolean;
    isPokemonVisible: boolean
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');