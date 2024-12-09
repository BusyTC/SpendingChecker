import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { spendingApi } from '../misc/SpendingApi'
import { handleLogError } from '../misc/Helpers'

import SpendingsTypeTable from './SpendingsTypeTable'

function SpendingsTypePage() {
  const Auth = useAuth()
  const user = Auth.getUser()
  const isUser = user.data.rol[0] === 'USER'

  const [userMe, setUserMe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [spendingTypeType, setSpendingTypeType] = useState('')

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
    if (name === 'spendingTypeType') {
      setSpendingTypeType(value)
    }
  }

  const handleCreateSpendingType = async () => {
    let trimmedTypeType = spendingTypeType.trim()
    if (!trimmedTypeType) {
      return
    }

    const spendingType = { type: trimmedTypeType}
    try {
      await spendingApi.createSpendingType(user, spendingType)
      await fetchUserMeData()
      setSpendingTypeType('')
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleDeleteSpendingType = async (id) => {
    try {
      await spendingApi.deleteSpendingType(user, id)
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
      <SpendingsTypeTable
        spendingTypes={userMe && userMe.spendingTypes}
        spendingTypeType={spendingTypeType}
        handleInputChange={handleInputChange}
        handleCreateSpendingType={handleCreateSpendingType}
        handleDeleteSpendingType={handleDeleteSpendingType}
        isLoading={isLoading}
        isSpendingLoading={isSpendingLoading}
      />
    </Container>
  )
}

export default SpendingsTypePage
