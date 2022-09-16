import React from 'react'
import styles from '../styles/PokemonDisplayer.module.css'
import TeamDisplayer from '../Components/TeamDisplayer'
import PokemonBox from './PokemonBox'
import { useState } from 'react'


export default function PokemonDisplayer({pokemonList}) {
    const [pokemonTeam,setPokemonTeam] = useState([])

    function handleClick(p) {
        pokemonTeam.length < 6 && setPokemonTeam([...pokemonTeam,p])
    }

    function removePokemon(index) {
        const copy = [...pokemonTeam]
        copy.splice(index, 1)
        setPokemonTeam(copy)
        console.log(pokemonTeam)
    }

  return (
    <div className={styles.wrapper}>

        < TeamDisplayer pokemonTeam={pokemonTeam} removePokemon={removePokemon} />

        { pokemonList.map( pokedex => ( // Cycles through each avaliable pokedex
            <div key={pokedex.name}>
                <div>
                    <h1>{pokedex.name}</h1> 
                    <div className={styles.pokemon_container}>
                        {pokedex.pk_list.map( pokemon => ( // Cycles through each available pokemon in the pokedex
                            <div key={pokemon.name}>

                                <PokemonBox pokemon={pokemon} handleClick={handleClick} />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )) }
    </div>
  )
}