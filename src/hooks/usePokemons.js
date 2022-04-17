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
        // dodatkowo, dla kazdego pokemona zrzucam potrzebne mi jego dane
        requests.push(axios
        .get(pokemon.url)
        .then(response => {
          const pokemonData = {
            types: response.data.types.map(typeObject => typeObject.type.name),
            weight: response.data.weight,
            height: response.data.height,
            sprite: response.data.sprites.other["official-artwork"].front_default
            // sprite: response.data.sprites.front_default
          }
          return {...pokemon, ...pokemonData}
        }))
      })
      // updatuje tablice z pokemonami dopiero gdy dane dla calej serii zostana pobrane 
      // (aby useEffect wyzej nie odpalil sie za wczesnie) 
      Promise.all(requests).then(results => {
        setPokemons(pokemons.concat(results))
        setNextPokemonsUrl(response.data.next)
      })
    })
  }

  return pokemons
}

export default usePokemons