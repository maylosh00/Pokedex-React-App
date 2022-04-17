import { useState, useEffect } from 'react'
import axios from 'axios'
import Filters from './components/Filters'
import Pokemons from './components/Pokemons'

import useTypes from './hooks/useTypes'
import './sass/app.sass'

const TYPES_URL = 'https://pokeapi.co/api/v2/type'
const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [filter, setFilter] = useState('')
  const [clickedTypes, setClickedTypes] = useState([])
  const [amount, setAmount] = useState(20)
  const [nextPokemonsUrl, setNextPokemonsUrl] = useState(POKEMONS_URL)
  // custom hooks for fetching data
  const {types, typesError} = useTypes(TYPES_URL)

  // wczytuje po kolei pokemony dopoki link do nastepnej 20-tki pokemonow nie jest nullem 
  useEffect(() => {
    if (nextPokemonsUrl) 
      loadPokemons(nextPokemonsUrl)

  }, [pokemons, nextPokemonsUrl])
  
  useEffect(() => {
    filterPokemons()
  }, [filter, clickedTypes])

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

  const filterPokemons = () => {
    setFilteredPokemons(pokemons.filter(pokemon => {
      // changes the original name format from "pokemon-name" to "pokemon name"
      const pokemonNameWithSpaces = pokemon.name.split('-').join(' ')
      // checks if the name includes filter 
      return pokemonNameWithSpaces.includes(filter.toLowerCase()) && 
      // check if pokemon has common types with clickedTypes array
      // if clickedTypes array is empty, this condition is skipped
      pokemon.types.some(type => clickedTypes.length > 0 ? clickedTypes.includes(type) : true)
    }))
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleCheckboxChange  = (event, checked) => {
    if (checked)
      setClickedTypes(clickedTypes.concat(event.target.value))
    else 
      setClickedTypes(clickedTypes.filter(type => type === event.target.value ? false : true))
  }

  const pokemonsToShow = clickedTypes.length > 0 || filter !== '' ? filteredPokemons : pokemons
  return (
    
    <div className="app">
      <h1>Pokedex</h1>

      {typesError && <div className='error-message'>{typesError}</div>}
      <Filters
        {...{handleInputChange, handleCheckboxChange, types, clickedTypes}}
      />
      
      <Pokemons 
        pokemons={pokemonsToShow.slice(0, amount)}
      />

      <button onClick={() => setAmount(amount + 20)}>Show more</button>
      <button onClick={() => setAmount(20)}>Show less</button>
    </div>
  );
}

export default App;
