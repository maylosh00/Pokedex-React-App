import {useState} from 'react'
import CheckboxFilter from './CheckboxFilter'

//div containing both name and checkbox filters

const Filters = ({handleInputChange, handleCheckboxChange, types, clickedTypes}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false)

  const handleClick = (event) => {
    setShowCheckboxes(!showCheckboxes)
  }

  return (
    <div>
      <h2>Search for pokemons:</h2>
      <input placeholder='e.g. "Pikachu"' onChange={handleInputChange}/>

      <div>
        <button onClick={handleClick}>
          {showCheckboxes ? 'Hide advanced filtering options' : 'Show advanced filtering options'}
        </button>
        
        {showCheckboxes ? 
          <>
            <h2>Filter by type:</h2>
            <CheckboxFilter types={types} onCheckboxChange={handleCheckboxChange} clickedTypes={clickedTypes} /> 
          </>
        : 
          ''}
      </div>
    </div>
  )
}

export default Filters
