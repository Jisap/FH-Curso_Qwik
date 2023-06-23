import { component$, $ } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';
//import { Link } from '@builder.io/qwik-city';


export default component$(() => {

  const nav = useNavigate();

  const { 
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    prevPokemon,
    toogleFromBack,
    toogleVisible } = usePokemonGame()
 
  const goToPokemon = $((id:number) => {
    nav(`/pokemon/${id}/`)
  })

  return (
    <>
      <spam class="text-2xl">Buscador simple</spam>
      <span class="text-9xl">{pokemonId}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={ () =>  goToPokemon( pokemonId.value ) }>
        <PokemonImage 
          id={pokemonId.value} 
          backImage={showBackImage.value} 
          isVisible={isPokemonVisible.value}
        />
      </div>
      {/* </Link> */}
      
      <div class="mt-2">
        <button 
          onClick$={ prevPokemon}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button 
          onClick$={ nextPokemon}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>
        <button
          onClick$={ toogleFromBack }
          class="btn btn-primary mr-2"
        >
          Voltear
        </button>
        <button
          onClick$={ toogleVisible }
          class="btn btn-primary"
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: '1ª app con Qwik',
    },
  ],
};
