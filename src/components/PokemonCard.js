import {useState} from 'react'
import noPokemon from '../img/no-pokemon.png'

//list item related to a particular pokemon, can be clicked to show more info

const PokemonInfo = ({ height, weight }) => {
  return (
    <div className='info-container'>
      <p>height: {height}</p>
      <p>weight: {weight}</p>
  </div>
  )
}

const PokemonCard = ({pokemon}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = (event) => {
    setClicked(!clicked)
  }

  return (
    <li className='pokemon-card' onClick={handleClick}>
        <div className='attributes'>
          <p>{pokemon.name.split('-').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')}</p>
          {pokemon ? 
            <>
              <div className='types-container'>
                {pokemon.types.map(type => 
                <div key={`${pokemon.name}${type}`} className={`type type-${type}`}>
                  <p>{type}</p>
                </div>
                )}
              </div>
              {clicked ? 
                <PokemonInfo weight={pokemon.weight} height={pokemon.height} />
              : ''}
             
            </>
          : 
            'loading...'
          } 
        </div>
        <div className='pokemon-img-container'>
          <img className='pokemon-img' src={pokemon.sprite ? pokemon.sprite : noPokemon} alt={pokemon.name + ' sprite'} />
        </div>
        
    </li>
  )
}

export default PokemonCard