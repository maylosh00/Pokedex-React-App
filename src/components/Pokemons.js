import PokemonCard from './PokemonCard'

const Pokemons = ({pokemons}) => {
  return (
    <div className='pokemons-section'>
      <ul className='pokemons-container'>
        { pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>) }
      </ul>
    </div>
  )
}

export default Pokemons