// global styles for the project
import { StyleSheet, Text, View } from 'react-native';

import Button from '../UI/Button.js';

// global styles for the project
import { GlobalStyles } from '../../constants/styles';

export default function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.conatiner}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: GlobalStyles.colors.primary700
  },

  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
