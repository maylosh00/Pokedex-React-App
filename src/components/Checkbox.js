import {useState} from 'react' 

const Checkbox = ({label, onChange, isChecked}) => {
  const [checked, setChecked] = useState(isChecked)
  const handleClick = (event) => {
    setChecked(!checked)
    onChange(event, !checked)
  }

  return (
    <div className='checkbox'>
    <label>
      <input 
      type="checkbox"
      value={label}
      checked={checked}
      onChange = {handleClick}
      />
      {label}
    </label>
    </div>
  )
}

export default Checkbox