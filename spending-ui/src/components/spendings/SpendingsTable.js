import React from 'react'
import { Grid, Table, Button, Header, Icon } from 'semantic-ui-react'
import SpendingsForm from './SpendingsForm'

function SpendingsTable({ spendings, spendingTypes, spendingDescription, spendingType, spendingPrice, handleInputChange, handleCreateSpending, handleDeleteSpending}) {
  let spendingList
  if (!spendings || spendings.length === 0) {
    spendingList = (
      <Table.Row key='no-spending'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>Нет покупок</Table.Cell>
      </Table.Row>
    )
  } else {
    spendingList = spendings.map(spending => {
      return (
        <Table.Row key={spending.id}>
          <Table.Cell>{spending.description}</Table.Cell>
          <Table.Cell>{spending.price}</Table.Cell>
          <Table.Cell>{spending.otype}</Table.Cell>
          <Table.Cell>{spending.createdAt}</Table.Cell>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteSpending(spending.id)}
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
          <Grid.Column width='4'>
            <Header as='h2'>
              <Icon name='ruble sign' />
              <Header.Content>Ваши покупки</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width='10'>
            <SpendingsForm
              spendingTypes={spendingTypes}
              spendingType={spendingType}
              spendingPrice={spendingPrice}
              spendingDescription={spendingDescription}
              handleInputChange={handleInputChange}
              handleCreateSpending={handleCreateSpending}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Описание покупки</Table.HeaderCell>
            <Table.HeaderCell width={3}>Стоимость покупки</Table.HeaderCell>
            <Table.HeaderCell width={2}>Тип покупки</Table.HeaderCell>
            <Table.HeaderCell width={3}>Дата создания покупки</Table.HeaderCell>
            <Table.HeaderCell width={1}>Удалить</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {spendingList}
        </Table.Body>
      </Table>
    </>
  )
}

export default SpendingsTable