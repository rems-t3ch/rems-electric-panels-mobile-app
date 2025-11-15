import { Stack } from 'expo-router';
import './global.css';

/**
 * Root Layout Component
 * @summary
 * Defines the root layout of the application, setting up stack navigation
 * for the main tabs and the boards screen.
 * 
 * @returns {JSX.Element} The root layout with stack navigation.
 */
const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="board/edit"
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
