import Checkbox from './Checkbox'

// element containing all the checkboxes with labels 

const CheckboxFilter = ({types, clickedTypes, onCheckboxChange}) => {
  return (
      <>
      {types.length > 0 ? 
      types.map(type => 
          <Checkbox 
          label={type} 
          key={type} 
          onChange={onCheckboxChange} 
          isChecked={clickedTypes ? clickedTypes.includes(type) : false}
        />) 
      : 
        'loading...'}
    </>
  )
}

export default CheckboxFilter
