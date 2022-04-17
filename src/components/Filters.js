import {useState} from 'react'
import CheckboxFilter from './CheckboxFilter'
import '../styles/app.css'

//div containing both name and checkbox filters

const Filters = ({handleInputChange, handleCheckboxChange, types, clickedTypes}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false)

  const handleClick = (event) => {
    setShowCheckboxes(!showCheckboxes)
  }

  return (
    <div className='filter-container'>
      <p>Search for pokemons:</p>
      <div className='search-bar'>
        <input placeholder='e.g. "Pikachu"' onChange={handleInputChange}/>
      </div>

      <div className='checkbox-container'>
        <button onClick={handleClick}>
          {showCheckboxes ? 'Hide filters' : 'Show more filters'}
        </button>
        
        {showCheckboxes ? 
          <>
            <p>Filter by type:</p>
            <CheckboxFilter types={types} onCheckboxChange={handleCheckboxChange} clickedTypes={clickedTypes} /> 
          </>
        : 
          ''}
      </div>
    </div>
  )
}

export default Filters
