import React from 'react'
import { Grid, Table, Button, Header, Icon, GridColumn } from 'semantic-ui-react'
import SpendingsTypeForm from './SpendingsTypeForm'

function SpendingsTypeTable({ spendingTypes, spendingTypeType, handleInputChange, handleCreateSpendingType, handleDeleteSpendingType}) {
  let spendingTypeList
  if (!spendingTypes || spendingTypes.length === 0) {
    spendingTypeList = (
      <Table.Row key='no-spendingType'>
        <Table.Cell collapsing textAlign='center' colSpan='3'>Нет типов покупок</Table.Cell>
      </Table.Row>
    )
  } else {
    spendingTypeList = spendingTypes.map(spendingType => {
      return (
        <Table.Row key={spendingType.id}>
          <Table.Cell>{spendingType.type}</Table.Cell>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteSpendingType(spendingType.id)}
            />
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Header as='h2'>
              <Icon name='tags'/>
              <Header.Content>Ваши типы покупок</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width='7'>
            <SpendingsTypeForm
              spendingTypeType={spendingTypeType}
              handleInputChange={handleInputChange}
              handleCreateSpendingType={handleCreateSpendingType}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid textAlign='center'>
        <GridColumn style={{ maxWidth: 450 }}>
          <Table compact striped >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={10}>Тип покупки</Table.HeaderCell>
                <Table.HeaderCell width={1}>Удалить</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {spendingTypeList}
            </Table.Body>
          </Table>
        </GridColumn>
      </Grid>
    </>
  )
}

export default SpendingsTypeTable