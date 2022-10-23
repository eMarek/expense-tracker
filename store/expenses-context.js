import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => { },
  addExpense: ({ description, amount, date }) => { },
  removeExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { }
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      const sortedExpenses = action.payload.reverse()
      return sortedExpenses
    case 'ADD':
      return [action.payload, ...state]
    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updateableExpenseIndex]
      const updatableItem = { ...updatableExpense, ...action.payload.expenseDate }
      const updatedExpenses = [...state]
      updatedExpenses[updateableExpenseIndex] = updatableItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses })
  }

  const addExpense = (expenseDate) => {
    dispatch({ type: 'ADD', payload: expenseDate })
  }

  const removeExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const updateExpense = (id, expenseDate) => {
    dispatch({ type: 'UPDATE', payload: { id, expenseDate } })
  }

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    removeExpense,
    updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider