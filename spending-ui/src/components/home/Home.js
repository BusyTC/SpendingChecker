import React, { useEffect, useState } from 'react'
import { Header, Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { spendingApi } from '../misc/SpendingApi'
import { handleLogError } from '../misc/Helpers'

function Home() {
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [numberOfSpendings, setNumberOfSpendings] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const responseUsers = await spendingApi.numberOfUsers()
        const numberOfUsers = responseUsers.data

        const responseOrders = await spendingApi.numberOfSpendings()
        const numberOfSpendings = responseOrders.data

        setNumberOfUsers(numberOfUsers)
        setNumberOfSpendings(numberOfSpendings)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
        <Dimmer active inverted>
          <Loader inverted size='huge'>Loading</Loader>
        </Dimmer>
      </Segment>
    )
  }

  return (
    <Container text>
      <Header as='h1'>Простое приложение для ведения персональных финансов</Header>
      <p>Для начала работы зарегистрируйтесь или войдите в аккаунт</p>
    </Container>
  )
}

export default Home