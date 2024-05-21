import { StyleSheet, Text, TextInput, View } from 'react-native';

// global styles for the project
import { GlobalStyles } from '../../constants/styles.js';

export default function Input({ label, textInputConfig }) {
  let inputStyles = [styles.input];

  // multiline aligns the text to the top on iOS, and centers it on Android.
  // Use with textAlignVertical set to top for the same behavior in both platforms.
  // https://reactnative.dev/docs/textinput#multiline
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiLines);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },

  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },

  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700, // text color
    fontSize: 18,
    padding: 6,
    borderRadius: 6
  },

  inputMultiLines: {
    minHeight: 100,
    textAlignVertical: 'top' // for multiline text input
  }
});
