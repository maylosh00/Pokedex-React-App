import { useEffect, useState } from 'react'
import axios from 'axios'

const usePokemons = (url, amount) => {
  const [pokemons, setPokemons] = useState([])
  const [nextPokemonsUrl, setNextPokemonsUrl] = useState(url)

  useEffect(() => {
    if (nextPokemonsUrl && pokemons.length !== amount) {
      const request = axios.get(nextPokemonsUrl)
      request.then(response => {
        Promise.all(response.data.results.map(pokemon => axios
          .get(pokemon.url)
          .then(response => {
            const pokemonData = {
              types: response.data.types.map(typeObject => typeObject.type.name),
              weight: response.data.weight,
              height: response.data.height,
              // sprite: response.data.sprites.other["official-artwork"].front_default
              sprite: response.data.sprites.other["home"].front_default
            }
          return {...pokemon, ...pokemonData}
          }))).then(results => {
          setPokemons(pokemons.concat(results))
          setNextPokemonsUrl(response.data.next)
        })
      })
    }
  }, [pokemons, nextPokemonsUrl, amount])

  const finishedLoading = nextPokemonsUrl === null 
  return {pokemons, finishedLoading}
}

export default usePokemons