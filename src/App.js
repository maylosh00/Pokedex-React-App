import { useState, useEffect } from 'react'
import axios from 'axios'

const Pokemon = ({pokemon}) => {
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then(promise => {
        const pokemonObject = {
          types: promise.data.types.map(typeObject => typeObject.type.name),
          weight: promise.data.weight,
          height: promise.data.height,
          // sprite: promise.data.sprites.other["official-artwork"].front_default
          sprite: promise.data.sprites.front_default
        }
        setPokemonData(pokemonObject)
      })
  }, [])

  return (
    <>
      <h2>{pokemon.name.split('-').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')}</h2>
      {pokemonData === null ? 
        'loading...' 
        : 
        <>
          <p>types: {pokemonData.types.join(', ')}</p>
          <p>height: {pokemonData.height}</p>
          <p>weight: {pokemonData.weight}</p>
          <img src={pokemonData.sprite} alt={pokemonData.name + ' sprite'} />
        </>
      }
    </>
  )
}


const Checkbox = ({label, onChange}) => {

  return (
    <div>
      <label>
        <input 
          type="checkbox"
          value={label}
          onChange = {onChange}
        />
        {label}
      </label>
    </div>
  )
}


const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [filter, setFilter] = useState('')
  const [types, setTypes] = useState([])
  const [clickedTypes, setClickedTypes] = useState([])
  const [amount, setAmount] = useState(20)
  const [nextPokemonsUrl, setNextPokemonsUrl] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')


  useEffect(() => {
    loadTypes()
  }, [])

  // wczytuje po kolei pokemony dopoki link do nastepnej 20-tki pokemonow nie jest nullem 
  useEffect(() => {
    if (nextPokemonsUrl)
      loadPokemons(nextPokemonsUrl)
  }, [pokemons, nextPokemonsUrl])

  
  
  const loadPokemons = (url) => {
    const request = axios.get(url)
    return request.then(response => {
      setPokemons(pokemons.concat(response.data.results))
      setNextPokemonsUrl(response.data.next)
      return
    })
  }

  const showMorePokemons = () => {
    const newAmount = amount + 20
    setAmount(newAmount)
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase())))
  }

   const loadTypes = () => {
     axios
    .get('https://pokeapi.co/api/v2/type')
    .then(promise => {
      setTypes(promise.data.results.map(type => type.name))

    })
  }
  
  const handleCheckboxChange  = (event, checked) => {
    //TODO dodawanie / usuwanie itemow do clickedTypes
  }

  return (
    
    <div className="App">
      <h2>Search for pokemons:</h2>
      <input placeholder='e.g. "Pikachu"' onChange={handleFilterChange}/>
      <h2>Filter by type:</h2>
      {types ? types.map(type => <Checkbox label={type} key={type} onChange={handleCheckboxChange}/>) : 'loading...'}

      <h1>Pokedex</h1>
      {filter ?
        filteredPokemons ? filteredPokemons.map(pokemon => <Pokemon key={pokemon.name} pokemon={pokemon}/>) : 'loading...'
      :
        pokemons ? pokemons.slice(0, amount).map(pokemon => <Pokemon key={pokemon.name} pokemon={pokemon}/>) : 'loading...'}
      <button onClick={showMorePokemons}>Load more...</button>
    </div>
  );
}

export default App;
