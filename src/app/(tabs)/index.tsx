import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <View className="bg-red-500 min-h-full flex items-center justify-center">
        <Text>Home Screen</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
