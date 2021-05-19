import { createContext, useReducer, useContext, useState } from 'react'
import service from '../service/localStorage'


const { getToken, setToken, clearToken, getUser, setUser, clearUser } = service

const myContext = createContext()

const INITIAL_STATE = {
  isAuthen: getToken(),
  user: getUser()
}

function checkAuthenByReducer(state, action) {
  switch (action.type) {
    case 'getToken': {
      setToken(action.token)
      setUser(action.user)
      return { isAuthen: action.token, user: action.user }
    }
    case 'clearToken': {
      clearToken()
      clearUser()
      return { isAuthen: getToken(), user: getUser() }
    }
    default: return state
  }
}

function ContextProvider(props) {
  const [state, dispatch] = useReducer(checkAuthenByReducer, INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const provide = { state, dispatch, loading, setLoading }

  return (
    <myContext.Provider value={provide}>{props.children}</myContext.Provider>
  )
}

function useMyContext() {
  const context = useContext(myContext)
  if (context === undefined) {
    throw new Error('useMycontext must use under ContextProvider')
  }
  return context;
}

export { ContextProvider, useMyContext }