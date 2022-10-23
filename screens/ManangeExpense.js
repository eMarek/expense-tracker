import { useContext, useLayoutEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import ExpenseForm from "../components/manange-expense/ExpenseForm"
import Button from "../components/ui/Button"
import ErrorOverlay from "../components/ui/ErrorOverlay"
import IconButton from "../components/ui/IconButton"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"
import { deleteExpense, postExpense, putExpense } from "../util/http"

const ManangeExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const { expenses, removeExpense, addExpense, updateExpense } = useContext(ExpensesContext)

  const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const removeExpenseHandler = async () => {
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId)
      removeExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense - please try again!')
      setIsSubmitting(false)
    }
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData)
        await putExpense(editedExpenseId, expenseData)
      } else {
        const id = await postExpense(expenseData)
        addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save data - please try again later!')
      setIsSubmitting(false)
    }

  }

  const errorHandler = () => {
    setError(null)
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && <View style={styles.deleteContainer}>
        <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={removeExpenseHandler} />
      </View>
      }
    </View>
  )
}

export default ManangeExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});