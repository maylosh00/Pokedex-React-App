import { useEffect, useState } from 'react'
import axios from 'axios'

const usePokemons = (url) => {
  const [pokemons, setPokemons] = useState([])
  const [nextPokemonsUrl, setNextPokemonsUrl] = useState(url)

  useEffect(() => {
    if (nextPokemonsUrl) 
      loadPokemons(nextPokemonsUrl)

  }, [pokemons, nextPokemonsUrl])

  const loadPokemons = (url) => {
    const request = axios.get(url)
    request.then(response => {
      let requests = []
      response.data.results.forEach(pokemon => {
        // fetching extra information about each pokemon
        requests.push(axios
        .get(pokemon.url)
        .then(response => {
          const pokemonData = {
            types: response.data.types.map(typeObject => typeObject.type.name),
            weight: response.data.weight,
            height: response.data.height,
            sprite: response.data.sprites.other["official-artwork"].front_default
          }
          return {...pokemon, ...pokemonData}
        }))
      })
      // updating the pokemons array when the data for entire series of pokemons is fetched
      // (so that useEffect doesn't trigger too early)
      Promise.all(requests).then(results => {
        setPokemons(pokemons.concat(results))
        setNextPokemonsUrl(response.data.next)
      })
    })
  }

  return pokemons
}

export default usePokemons