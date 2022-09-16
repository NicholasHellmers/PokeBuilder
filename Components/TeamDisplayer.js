import React from 'react'
import styles from '../styles/TeamDisplayer.module.css'

export default function TeamDisplayer({pokemonTeam , removePokemon}) {
  return (
    <div className={styles.TeamDisplayer_wrapper}>
        {pokemonTeam.map((pokemon,index) => (
            <div className={styles.PokemonBox_wrapper} key={index} id={index}>
                <button onClick={() => removePokemon(index)}>
                    <div className={styles.pokemon_image} style={{backgroundImage: `url("../images/pokemon/` + pokemon.name + `.avif")` }} ></div>
                    <p>{pokemon.name}</p>
                    <div className={styles.types}>
                      {pokemon.types.map((pokemon,index) => (
                        <p key={"type" + index} id={pokemon.type.name}>{pokemon.type.name}</p>
                      ))}
                    </div>
                      {/* {pokemon.stats.map((stats) => (
                        <p key={stats.stat.name} id={stats.stat.name}>{stats.stat.name} : {stats.base_stat}</p>
                      ))} */}
                </button>
            </div>
        ))}
    </div>
  )
}
