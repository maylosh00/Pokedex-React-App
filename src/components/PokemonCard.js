import {useState} from 'react'

//list item related to a particular pokemon, can be clicked to show more info

const PokemonCard = ({pokemon}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = (event) => {
    setClicked(!clicked)
  }

  const style = {
    borderStyle: 'solid',
    borderWidth: 1
  }

  return (
    <li>
      <div className='pokemon-card' style={style} onClick={handleClick}>
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
            <img src={pokemon.sprite} alt={pokemon.name + ' sprite'} />
          </>
        : 
          'loading...'
        } 
      </div>
    </li>
  )
}

export default PokemonCard