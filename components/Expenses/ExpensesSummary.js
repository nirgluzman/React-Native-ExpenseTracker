import { View, Text } from 'react-native';

export default function ExpensesSummary({ expenses, periodName }) {
  // use the reduce method on the expenses array to calculate the sum of all amount properties in the array.
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
