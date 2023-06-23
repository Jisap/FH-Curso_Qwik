import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(({id, size=175, backImage=false, isVisible=true }:Props) => {

    const imageLoaded = useSignal(false);

    useTask$(({track}) => {
        track(() => id);            // Cuando cambie el id
        imageLoaded.value = false;  // imageLoaded en false
    });

    const imageUrl = useComputed$(() => {

        if( id === '' ) return '';

        return ( backImage )
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    });

    
    return (
        <div class='flex items-center justify-center' style={{width:`${size}px`, height:`${size}px`}}>

            { !imageLoaded.value && (<span>Cargando...</span>)}
            <img 
                src={imageUrl.value}
                alt="pokemon_sprite" 
                width={`${size}`}
                height={175}
                onLoad$={() => {
                    setTimeout(() => {
                        imageLoaded.value = true
                    },100)
                }}
                class={[{
                    'hidden': !imageLoaded.value, // Si la imagen no esta cargada la imagen se oculta
                    'brightness-0': !isVisible,
                }, 'transition-all']} 
            />    
        </div>
    )
})