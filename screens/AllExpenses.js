import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/expenses-output/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"

const AllExpenses = () => {
  const {expenses} = useContext(ExpensesContext)
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="No registered expenses."
    />
  )
}

export default AllExpenses