import { FlatList, Text } from 'react-native';

function renderExpenseItem(itemData) {
  return <Text>{itemData.item.description}</Text>;
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
