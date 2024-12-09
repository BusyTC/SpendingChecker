import React from 'react'
import { Form, Button, Icon, MenuItem } from 'semantic-ui-react'

function SpendingsForm({ spendingTypes, spendingDescription, spendingPrice, spendingType, handleInputChange, handleCreateSpending}) {
  const createBtnDisabled = spendingDescription.trim() === '' || spendingType.trim() === '' || spendingPrice.trim() === ''
  let spendingTypeOptions
  if (!spendingTypes || spendingTypes.length == 0) {
    console.log("Error")
  } else {
    spendingTypeOptions = spendingTypes.map(spendingTypes => {
      return (
        {key: spendingTypes.id, text: spendingTypes.type, value: spendingTypes.type}
      )
    })
  }
  
  return (
    <Form autoComplete="off" onSubmit={handleCreateSpending}>
      <Form.Group>
        <Form.Input
          name='spendingDescription'
          placeholder='Описание покупки'
          value={spendingDescription}
          onChange={handleInputChange}
        />
        <Form.Input
          name='spendingPrice'
          placeholder='Стоимость покупки'
          value={spendingPrice}
          onChange={handleInputChange}
        />
        <Form.Dropdown
          name='spendingType'
          placeholder='Тип покупки'
          selection
          value={spendingType}
          onChange={handleInputChange}
          options={spendingTypeOptions}
        />
        <Button icon disabled={createBtnDisabled}>
          Создать новую покупку
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SpendingsForm