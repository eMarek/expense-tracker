const BACKEND_URL = 'https://expense-tracker-3323c-default-rtdb.europe-west1.firebasedatabase.app'

export const postExpense = async (expenseData) => {
  const response = await fetch(`${BACKEND_URL}/expenses.json`, {
    method: 'POST',
    body: JSON.stringify(expenseData)
  })
  const data = await response.json()
  const id = data.name
  return id
}

export const fetchExponses = async () => {
  const response = await fetch(`${BACKEND_URL}/expenses.json`, {
    method: 'GET'
  })
  const data = await response.json()

  const expenses = []
  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    }
    expenses.push(expenseObj)
  }

  return expenses
}

export const putExpense = async (id, expenseData) => {
  await fetch(`${BACKEND_URL}/expenses/${id}.json`, {
    method: 'PUT',
    body: JSON.stringify(expenseData)
  })
}

export const deleteExpense = async (id) => {
  await fetch(`${BACKEND_URL}/expenses/${id}.json`, {
    method: 'DELETE'
  })
}