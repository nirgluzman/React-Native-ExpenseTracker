import { StyleSheet, Pressable, Text, View } from 'react-native';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

export default function ExpenseItem({ description, amount, date }) {
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{date.toString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12, // distance to the edges
    marginVertical: 8, // vertical spacing between multiple expense items
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    // shadow for Android
    elevation: 3,
    // shadow for iOS
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4
  },

  textBase: {
    color: GlobalStyles.colors.primary50
  },

  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold'
  }
});
