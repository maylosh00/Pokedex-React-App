import { useState, useEffect } from 'react'
import axios from 'axios'

const Pokemon = ({pokemon}) => {

  return (
    <>
      <h2>{pokemon.name.split('-').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')}</h2>
      {pokemon ? 
                <>
                <p>types: {pokemon.types.join(', ')}</p>
                <p>height: {pokemon.height}</p>
                <p>weight: {pokemon.weight}</p>
                <img src={pokemon.sprite} alt={pokemon.name + ' sprite'} />
              </>
        : 
        'loading...'
      } 
    </>
  )
}


const Checkbox = ({label, onChange}) => {
  const [checked, setChecked] = useState(false)
  const handleClick = (event) => {
    setChecked(!checked)
    onChange(event, !checked)
  }


  return (
    <div>
      <label>
        <input 
          type="checkbox"
          value={label}
          checked={checked}
          onChange = {handleClick}
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
  
  useEffect(() => {
    filterPokemons()
  }, [filter, clickedTypes])

  const loadPokemons = (url) => {
    const request = axios.get(url)
    request.then(response => {
      // let pokemonsWithData = []

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
            // sprite: response.data.sprites.other["official-artwork"].front_default
            sprite: response.data.sprites.front_default
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

  const loadTypes = () => {
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then(promise => {
        setTypes(promise.data.results.map(type => type.name))
      })
  }

  const filterPokemons = () => {
    console.log('hi!')
    setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.includes(filter.toLowerCase()) && pokemon.types.some(type => clickedTypes.length > 0 ? clickedTypes.includes(type) : true)))
  }

  const showMorePokemons = () => {
    const newAmount = amount + 20
    setAmount(newAmount)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    // setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase())))
  }
  
  const handleCheckboxChange  = (event, checked) => {
    if (checked)
      setClickedTypes(clickedTypes.concat(event.target.value))
    else 
      setClickedTypes(clickedTypes.filter(type => type === event.target.value ? false : true))
  }

  return (
    
    <div className="App">
      <h2>Search for pokemons:</h2>
      <input placeholder='e.g. "Pikachu"' onChange={handleFilterChange}/>
      <h2>Filter by type:</h2>
      {types ? types.map(type => <Checkbox label={type} key={type} onChange={handleCheckboxChange}/>) : 'loading...'}

      <h1>Pokedex</h1>
      {(clickedTypes.length > 0 || filter !== '') ?
        filteredPokemons ? filteredPokemons.slice(0,amount).map(pokemon => <Pokemon key={pokemon.name} pokemon={pokemon}/>) : 'loading...'
      : 
        pokemons ? pokemons.slice(0, amount).map(pokemon => <Pokemon key={pokemon.name} pokemon={pokemon}/>) : 'loading...'}
      <button onClick={showMorePokemons}>Load more...</button>
    </div>
  );
}

export default App;
