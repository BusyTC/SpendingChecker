import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import SpendingsTable from './SpendingsTable'
import { useAuth } from '../context/AuthContext'
import { spendingApi } from '../misc/SpendingApi'
import { handleLogError } from '../misc/Helpers'

function SpendingsPage() {
  const Auth = useAuth()
  const user = Auth.getUser()
  const isUser = user.data.rol[0] === 'USER'

  const [userMe, setUserMe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [spendingDescription, setSpendingDescription] = useState('')
  const [spendingType, setSpendingType] = useState('')
  const [spendingPrice, setspendingPrice] = useState('')

  const [isSpendingLoading, setisSpendingLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        const response = await spendingApi.getUserMe(user)
        setUserMe(response.data)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'spendingDescription') {
      setSpendingDescription(value)
    }
    if (name === 'spendingType') {
      setSpendingType(value)
    }
    if (name === 'spendingPrice') {
      setspendingPrice(value)
    }
  }

  const handleCreateSpending = async () => {
    let trimmedDescription = spendingDescription.trim()
    if (!trimmedDescription) {
      return
    }

    const spending = { description: trimmedDescription, otype: spendingType, price: spendingPrice }
    try {
      await spendingApi.createSpending(user, spending)
      await fetchUserMeData()
      setSpendingDescription('')
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleDeleteSpending = async (id) => {
    try {
      await spendingApi.deleteSpending(user, id)
      await fetchUserMeData()
    } catch (error) {
      handleLogError(error)
    }
  }

  const fetchUserMeData = async () => {
    setIsLoading(true)

    try {
      const response = await spendingApi.getUserMe(user)
      setUserMe(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isUser) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <SpendingsTable
        spendings={userMe && userMe.spendings }
        spendingTypes={userMe && userMe.spendingTypes}
        isLoading={isLoading}
        isSpendingLoading={isSpendingLoading}
        spendingDescription={spendingDescription}
        spendingType={spendingType}
        spendingPrice={spendingPrice}
        handleCreateSpending={handleCreateSpending}
        handleDeleteSpending={handleDeleteSpending}
        handleInputChange={handleInputChange}
      />
    </Container>
  )
}

export default SpendingsPage
