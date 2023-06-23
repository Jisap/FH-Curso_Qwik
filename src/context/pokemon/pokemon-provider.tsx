
import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        isPokemonVisible: true,
        showBackImage: false,
    });

    useContextProvider(PokemonGameContext, pokemonGame); // Provider del pokemon

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: [],
    })

    useContextProvider(PokemonListContext, pokemonList); // Provider de la lista de pokemons

    useVisibleTask$(() => {
        console.log('Primer visible task')
        //Leer del local storage
        if(localStorage.getItem('pokemon-game')){
            const {
                isPokemonVisible =true, // valores por defecto
                pokemonId = 10,
                showBackImage = false
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState; 

            pokemonGame.isPokemonVisible = isPokemonVisible; // Se asignan los valores del localStorage al store del provider
            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;

        }
    })

    useVisibleTask$(({track}) => {
        console.log('Segundo visible task')
        // grabar en local storage cada vez que cambia el track
        track(() => [
            pokemonGame.isPokemonVisible,
            pokemonGame.pokemonId,
            pokemonGame.showBackImage
        ]);
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    });


  return <Slot />
});