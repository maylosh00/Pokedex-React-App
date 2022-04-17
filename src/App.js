import { useState, useEffect } from 'react'
import Filters from './components/Filters'
import Pokemons from './components/Pokemons'
import useTypes from './hooks/useTypes'
import usePokemons from './hooks/usePokemons'

import logo from './img/logo.png';
import './styles/app.css'


const TYPES_URL = 'https://pokeapi.co/api/v2/type'
const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'

const App = () => {
  const [filter, setFilter] = useState('')
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [clickedTypes, setClickedTypes] = useState([])
  const [amount, setAmount] = useState(20)
  // custom hooks for fetching data
  const {types, typesError} = useTypes(TYPES_URL)
  const pokemons = usePokemons(POKEMONS_URL)

  useEffect(() => {
    filterPokemons()
  }, [filter, clickedTypes])

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
      <header>
        <img src={logo} alt='Pokedex'/>
      </header>

      {typesError && <div className='error-message'>{typesError}</div>}
      <Filters
        {...{handleInputChange, handleCheckboxChange, types, clickedTypes}}
      />
      
      <Pokemons 
        pokemons={pokemonsToShow.slice(0, amount)}
      />
      <div className='buttons-container'>
        <button onClick={() => setAmount(amount + 20)}>Show more</button>
        <button onClick={() => setAmount(20)}>Show less</button>
      </div>
    </div>
  );
}

export default App;
