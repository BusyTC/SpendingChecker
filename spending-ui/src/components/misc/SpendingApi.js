import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const spendingApi = {
  authenticate,
  signup,
  numberOfUsers,
  numberOfSpendings,
  getUsers,
  deleteUser,
  getSpendings,
  deleteSpending,
  createSpending,
  createSpendingType,
  deleteSpendingType,
  getUserMe
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  })
}

function numberOfUsers() {
  return instance.get('/public/numberOfUsers')
}

function numberOfSpendings() {
  return instance.get('/public/numberOfSpendings')
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getSpendings(user, text) {
  const url = text ? `/api/spendings?text=${text}` : '/api/spendings'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteSpending(user, spendingId) {
  return instance.delete(`/api/spendings/${spendingId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createSpending(user, spending) {
  return instance.post('/api/spendings', spending, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function createSpendingType(user, spendingType) {
  return instance.post('/api/spendingTypes', spendingType, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function deleteSpendingType(user, id) {
  return instance.delete(`/api/spendingTypes/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}