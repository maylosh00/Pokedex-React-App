import { useState, useEffect } from 'react'
import axios from 'axios'
import Filters from './components/Filters'
import Pokemons from './components/Pokemons'

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
    setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.includes(filter.toLowerCase()) && pokemon.types.some(type => clickedTypes.length > 0 ? clickedTypes.includes(type) : true)))
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleCheckboxChange  = (event, checked) => {
    if (checked)
      setClickedTypes(clickedTypes.concat(event.target.value))
    else 
      setClickedTypes(clickedTypes.filter(type => type === event.target.value ? false : true))
  }

  return (
    
    <div className="App">
      <h1>Pokedex</h1>

      <Filters
        onInputChange={handleFilterChange}
        onCheckboxChange={handleCheckboxChange}
        types={types}
        clickedTypes={clickedTypes}
      />
      
      <Pokemons 
        pokemons={pokemons} 
        filteredPokemons={filteredPokemons}
        showFiltered={clickedTypes.length > 0 || filter !== ''}
        amount={amount}
        showMoreHandler={() => setAmount(amount + 20)}
        showLessHandler={() => setAmount(20)}
      />
    </div>
  );
}

export default App;
