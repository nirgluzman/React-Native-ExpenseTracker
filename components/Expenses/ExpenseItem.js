import { StyleSheet, Pressable, Text, View } from 'react-native';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

// helper function to format the date
import { getFormattedDate } from '../../util/date.js';

export default function ExpenseItem({ description, amount, date }) {
  function expensePressHandler() {
    console.log('Pressed!');
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) =>
        pressed && styles.pressed
      }>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },

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
    borderRadius: 4,
    minWidth: 80
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold'
  }
});
