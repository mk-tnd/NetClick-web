const tokenName = 'token'
const userName = 'user'
const setToken = token => { return localStorage.setItem(tokenName, token) };
const getToken = () => { return localStorage.getItem(tokenName) };
const clearToken = () => { return localStorage.removeItem(tokenName) };
const setUser = user => { return localStorage.setItem(userName, user) }
const getUser = () => { return localStorage.getItem(userName) };
const clearUser = () => { return localStorage.removeItem(userName) };
const service = { setToken, getToken, clearToken, setUser, getUser, clearUser }

export default service;