import React from 'react'
import styles from '../styles/PokemonBox.module.css'

export default function PokemonBox({ pokemon, handleClick }) {
  return (
    <div className={styles.PokemonBox_wrapper} >
        <button onClick={() => handleClick(pokemon)}>
            <div className={styles.pokemon_image} style={{backgroundImage: `url("../images/pokemon/` + pokemon.name + `.avif")` }} ></div>
            <p>{pokemon.name}</p>
            <div className={styles.types}>
              {pokemon.types.map((pokemon,index) => (
                <p key={"type" + index} >{pokemon.type.name}</p>
              ))}
            </div>
        </button>
    </div>
  )
}
