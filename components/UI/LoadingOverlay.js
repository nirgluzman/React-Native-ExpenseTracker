import {
  StyleSheet,
  View,
  ActivityIndicator // displays a circular loading indicator, https://reactnative.dev/docs/activityindicator
} from 'react-native';

// global styles for the project
import { GlobalStyles } from '../../constants/styles';

export default function LoadingOverlay() {
  return (
    <View style={styles.conatiner}>
      <ActivityIndicator size='large' color='white' />
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
  }
});
