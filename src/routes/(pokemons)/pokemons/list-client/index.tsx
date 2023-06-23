import { component$, useOnDocument, useStore, useTask$, useVisibleTask$, $, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { SmallPokemon } from '~/interfaces';


export default component$(() => {

  const pokemonState = useContext( PokemonListContext );

  useOnDocument('scroll', $(() => { // listener para el evento scroll
    const maxScroll = document.body.scrollHeight; 
    const currentScroll = window.scrollY + window.innerHeight;

    if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading){
      pokemonState.isLoading=true;
      pokemonState.currentPage++
    }
  }))


  useTask$(async ({ track }) => { // permite definir y ejecutar tareas asincrónicas en un componente. Se ejecuta antes del render de la app
    track( () => pokemonState.currentPage )
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];    
    pokemonState.isLoading = false;
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual:{ pokemonState.currentPage } </span>
        <span>Esta cargando: </span>
      </div>
      <div class="mt-10">
        {/* <button 
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage--} 
        >
          Anteriores
        </button> */}
        <button 
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage++}  
        >
          Siguientes
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">

        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize">
              {name}
            </span>
          </div>
        ))}


      </div>

    </>
  )
});

export const head: DocumentHead = {
  title: 'List-Client',
  
};
