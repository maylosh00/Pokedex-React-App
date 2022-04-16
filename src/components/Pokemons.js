import PokemonCard from './PokemonCard'

//div containing pokemon cards and buttons for showing more / less cards

const Pokemons = ({pokemons, filteredPokemons, showFiltered, amount, showMoreHandler, showLessHandler}) => {
  return (
    <div>
      <ul>
      {showFiltered ?
        filteredPokemons ? filteredPokemons.slice(0,amount).map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>) : 'loading...'
      : 
        pokemons ? pokemons.slice(0, amount).map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>) : 'loading...'}
      </ul>

      <button onClick={showMoreHandler}>Show more</button>
      <button onClick={showLessHandler}>Show less</button>
    </div>
  )
}

export default Pokemons