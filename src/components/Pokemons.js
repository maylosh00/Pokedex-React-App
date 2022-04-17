import PokemonCard from './PokemonCard'

//div containing pokemon cards and buttons for showing more / less cards

const Pokemons = ({pokemons}) => {
  return (
    <div className='pokemons-section'>
      <ul className='pokemons-container'>
        {pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>)}
      </ul>
    </div>
  )
}

export default Pokemons