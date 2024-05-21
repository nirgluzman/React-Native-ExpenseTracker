import { StyleSheet, View, Text } from 'react-native';

// global styles for the project
import { GlobalStyles } from '../../constants/styles';

export default function ExpensesSummary({ expenses, periodName }) {
  // use the reduce method on the expenses array to calculate the sum of all amount properties in the array.
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400
  },

  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
});
