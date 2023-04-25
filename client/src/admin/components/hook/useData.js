import { useContext } from 'react'
import contextProvider from '../context/contextProvider'
const useData = () => {
  return useContext(contextProvider)
}
export default useData
