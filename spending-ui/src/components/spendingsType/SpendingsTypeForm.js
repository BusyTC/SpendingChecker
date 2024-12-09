import React from 'react'
import { Form, Button, Icon, MenuItem } from 'semantic-ui-react'

function SpendingsTypeForm({ spendingTypeType, handleInputChange, handleCreateSpendingType}) {
  const createBtnDisabled = spendingTypeType.trim() === ''
  
  return (
    <Form autoComplete="off" onSubmit={handleCreateSpendingType}>
      <Form.Group>
        <Form.Input
          name='spendingTypeType'
          placeholder='Тип покупки'
          value={spendingTypeType}
          onChange={handleInputChange}
        />
        <Button icon disabled={createBtnDisabled}>
          Создать новый тип покупки
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SpendingsTypeForm