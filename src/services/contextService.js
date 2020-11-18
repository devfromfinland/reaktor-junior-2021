import { useContext, createContext } from 'react'

export const AppContext = createContext({})

export const useAppContext = () => {
  return useContext(AppContext)
}
