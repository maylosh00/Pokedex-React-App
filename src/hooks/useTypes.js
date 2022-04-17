import { useEffect, useState } from 'react'
import axios from 'axios'

const useTypes = (url) => {

  const [types, setTypes] = useState([])
  const [typesError, setTypesError] = useState("")

  useEffect(() => {
    axios
      .get(url)
      .then(promise => {
        setTypes(promise.data.results.map(type => type.name))
      })
      .catch(error => {
        setTypesError('"Types" data could not be retrieved')
      })
  }, [])

  return {types, typesError}
}

export default useTypes

