import { useContext, useEffect, useState } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/expenses-output/ExpensesOutput"
import ErrorOverlay from "../components/ui/ErrorOverlay"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExponses } from "../util/http"

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)
  const { expenses, setExpenses } = useContext(ExpensesContext)

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExponses()
        setExpenses(expenses)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  const errorHandler = () => {
    setError(null)
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return (expense.date > date7DaysAgo) && (expense.date <= today)
  })

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses in last 7 days."
    />
  )
}

export default RecentExpenses