import { FlatList, StyleSheet, Text } from "react-native"
import ExpenseItem from "./ExpenseItem"

const ExpensesList = ({ expenses }) => {
  const renderExpense = ({ item }) => {
    return (
      <ExpenseItem {...item} />
    )
  }

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpense}
      keyExtractor={({ id }) => id}
    />
  )
}

export default ExpensesList


const styles = StyleSheet.create({
  container: {
  },
});
