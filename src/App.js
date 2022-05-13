import { useState, useEffect } from 'react'
import Filters from './components/Filters'
import Pokemons from './components/Pokemons'
import useTypes from './hooks/useTypes'
import usePokemons from './hooks/usePokemons'
import ThreeDots from './loaders/threeDots'

import logo from './img/logo.png';
import './styles/app.css'

const TYPES_URL = 'https://pokeapi.co/api/v2/type'
const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
const POKEMONS_PER_PAGE = 18;

const App = () => {
  const [filter, setFilter] = useState('')
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [clickedTypes, setClickedTypes] = useState([])
  const [amount, setAmount] = useState(POKEMONS_PER_PAGE)
  // custom hooks for fetching data
  const {types, typesError} = useTypes(TYPES_URL)
  const {pokemons, finishedLoading} = usePokemons(POKEMONS_URL)

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
  const showMoreButton = amount < pokemonsToShow.length
  const showLessButton = amount > POKEMONS_PER_PAGE && pokemonsToShow.length > POKEMONS_PER_PAGE
  return (
    
    <div className='app'>
      <header>
        <img src={logo} alt='Pokedex'/>
      </header>

      <Filters
        {...{handleInputChange, handleCheckboxChange, types, clickedTypes}}
      />

      {typesError && <div className='error-message'>{typesError}</div>}

      <Pokemons pokemons={pokemonsToShow.slice(0, amount)} />

      {!finishedLoading && pokemonsToShow.length < amount 
      ? <div className='info'><ThreeDots /></div> 
      : null}

      {finishedLoading && pokemonsToShow.length === 0 
      ? <div className='info'>Oops, looks like there are no pokemons matching your filters :(</div> 
      : null}
      
      <div className='buttons-container'>
        {showMoreButton && <button onClick={() => setAmount(amount + POKEMONS_PER_PAGE)}>Show more</button>}
        {showLessButton && <button onClick={() => setAmount(POKEMONS_PER_PAGE)}>Show less</button>}
      </div>
    </div>
  )
}

export default App

 