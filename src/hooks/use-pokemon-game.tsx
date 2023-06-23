import { useComputed$, useContext, $ } from '@builder.io/qwik';
import { PokemonGameContext } from "~/context";



export const UsePokemonGame = () => {
  
    const pokemonGame = useContext(PokemonGameContext); // context del pokemon

    const changePokemonId = $((value: number) => {
        if ((pokemonGame.pokemonId + value) <= 0) {
            return;
        }
        pokemonGame.pokemonId += value;
    });
    
    const toogleFromBack = $(() => {
        pokemonGame.showBackImage = !pokemonGame.showBackImage;
    })

    const toogleVisible = $(() => {
        pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
    })

    return {
        pokemonId: useComputed$(() => pokemonGame.pokemonId),               // Estos valores se memorizan y se recalcularán solo si cambian las dependencias en el estado
        showBackImage: useComputed$(() => pokemonGame.showBackImage),
        isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),

        nextPokemon: $(() => changePokemonId(+1)),
        prevPokemon: $(() => changePokemonId(-1)),

        toogleFromBack,
        toogleVisible,
    
    }
};