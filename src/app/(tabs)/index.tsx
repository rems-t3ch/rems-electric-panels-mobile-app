import { StatusBar } from 'expo-status-bar';

import '../global.css';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <View className='bg-red-500'>
        <Text>Hello, World!</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
