import {useState} from 'react'
import CheckboxFilter from './CheckboxFilter'

//div containing both name and checkbox filters

const Filters = ({onInputChange, onCheckboxChange, types, clickedTypes}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false)

  const handleClick = (event) => {
    setShowCheckboxes(!showCheckboxes)
  }

  return (
    <div>
      <h2>Search for pokemons:</h2>
      <input placeholder='e.g. "Pikachu"' onChange={onInputChange}/>

      <div>
        <button onClick={handleClick}>
          {showCheckboxes ? 'Hide advanced filtering options' : 'Show advanced filtering options'}
        </button>
        
        {showCheckboxes ? 
          <>
            <h2>Filter by type:</h2>
            <CheckboxFilter types={types} onCheckboxChange={onCheckboxChange} clickedTypes={clickedTypes} /> 
          </>
        : 
          ''}
      </div>
    </div>
  )
}

export default Filters
