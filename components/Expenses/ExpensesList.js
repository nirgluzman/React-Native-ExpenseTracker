import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem.js';

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses} // data (array) to be displayed
      renderItem={renderExpenseItem} // function to render each item
      keyExtractor={item => item.id} // key for each item
    />
  );
}
