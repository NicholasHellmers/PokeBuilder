import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import PokemonDisplayer from '../../Components/PokemonDisplayer'
import Footer from '../../Components/Footer'
import Navbar from '../../Components/Navbar'

export default function Version({pokemonList}) {
  const router = useRouter()
  return (
    <div>
        <Navbar />

        <Link href="/">
          <a>Home</a>
        </Link>

      <div>
        <div>

        < PokemonDisplayer pokemonList={pokemonList} />

        </div>
      </div>
      < Footer />
    </div>
  )
}

export async function getStaticPaths() {
  const data = await axios.get("https://pokeapi.co/api/v2/version-group?limit=11")
  const paths = await data.data.results.map( version => ({
    params: { id: version.name }
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {

  const res = await axios.get("https://pokeapi.co/api/v2/version-group/" + context.params.id)

  const gen = (res.data.generation.url).substring(37,((res.data.generation.url).length)-1)

  const getPokemon = () => {
    const promises = res.data.pokedexes.map( async (pokedex) => { // Cycles through each pokedex

        const getPokemonInfo = async () => { // Cycles through each pokemon and gets its info
          const promises = (await axios.get(pokedex.url)).data.pokemon_entries.map( async p => {

            const pokemon_id = (p.pokemon_species.url).substring(42,p.pokemon_species.url.length-1)
            const pokemon = (await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon_id)).data

            const getType = () => {
              let types
              if ((pokemon.past_types).length > 0) {
                types = pokemon.past_types.map( (p) => {
                  const gen_threshhold = (p.generation.url).substring(37,((res.data.generation.url).length)-1)
                  if (gen_threshhold >= gen) {
                    return p.types
                  } else {
                    return pokemon.types
                  }
                })
              } else {
                return pokemon.types
              }
              return types[0]
            }

            const types = getType()

            return {
              name: pokemon.name,
              types: types
            }
          })
          return Promise.all(promises)
        }
        
      const pokemon_list = await getPokemonInfo()
        
        console.log("Done")

      return {
        name: pokedex.name,
        
        pk_list: pokemon_list
      }
    })
    return Promise.all(promises)
  }
  const pokemonList = await getPokemon()
  return {
    props: {
      pokemonList: pokemonList,
    },
    revalidate: 1,
  }
}

