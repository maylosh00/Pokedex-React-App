import {useState} from 'react'

//list item related to a particular pokemon, can be clicked to show more info

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
                <div className={`type type-${type}`}>
                  <p>{type}</p>
                </div>
                )}
              </div>
              {clicked ? 
                <div className='info-container'>
                  <p>height: {pokemon.height}</p>
                  <p>weight: {pokemon.weight}</p>
                </div>
              : ''}
             
            </>
          : 
            'loading...'
          } 
        </div>
        <div className='pokemon-img-container'>
          <img className='pokemon-img' src={pokemon.sprite !== null ? pokemon.sprite : './img/no-pokemon.png'} alt={pokemon.name + ' sprite'} />
        </div>
        
    </li>
  )
}

export default PokemonCard