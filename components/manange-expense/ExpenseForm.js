import { useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../util/date"
import Button from "../ui/Button"
import Input from "./Input"

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    },
  })

  const inputChangedHandler = (inputIdentifier, enteredAmount) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [inputIdentifier]: {
        value: enteredAmount,
        isValid: true
      }
    }))
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevValues) => ({
        amount: { value: prevValues.amount.value, isValid: amountIsValid },
        date: { value: prevValues.date.value, isValid: dateIsValid },
        description: { value: prevValues.description.value, isValid: descriptionIsValid },
      }))
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: 'none',
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 14,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: 'bold'
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
})