import {useState} from 'react'
import '../sass/pokemon-card.sass'

//list item related to a particular pokemon, can be clicked to show more info

const PokemonCard = ({pokemon}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = (event) => {
    setClicked(!clicked)
  }

  return (
    <li>
      <div className='pokemon-card' onClick={handleClick}>
        <div className='attributes'>
          <h2>{pokemon.name.split('-').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')}</h2>
          {pokemon ? 
            <>
              <p>types: {pokemon.types.join(', ')}</p>
              {clicked ? 
                <>
                  <p>height: {pokemon.height}</p>
                  <p>weight: {pokemon.weight}</p>
                </>
              : ''}
             
            </>
          : 
            'loading...'
          } 
        </div>
        <img className='pokemon-img' src={pokemon.sprite} alt={pokemon.name + ' sprite'} />
      </div>
    </li>
  )
}

export default PokemonCard