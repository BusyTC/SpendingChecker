import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const spendingsPageStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'USER' ? { "display": "block" } : { "display": "none" }
  }

  const spendingsTypePageStyle = () => {
    const user = getUser()
    return user && user.data.rol[0] === 'USER' ? { "display": "block" } : { "display": "none" }
  }

  const getUserName = () => {
    const user = getUser()
    return user ? user.data.name : ''
  }

  return (
    <Menu inverted color='violet' stackable size='massive' style={{ borderRadius: 0 }}>
      <Container>
        {/* <Menu.Item header>Order-UI</Menu.Item> */}
        <Menu.Item as={Link} exact='true' to="/">SpendingChecker</Menu.Item>
        <Menu.Item as={Link} to="/spendings" style={spendingsPageStyle()}>Покупки</Menu.Item>
        <Menu.Item as={Link} to="/spendingsType" style={spendingsTypePageStyle()}>Типы покупок</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Войти</Menu.Item>
          <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Зарегистрироваться</Menu.Item>
          <Menu.Item header style={logoutMenuStyle()}>{`${getUserName()}`}</Menu.Item>
          <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Выйти</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar