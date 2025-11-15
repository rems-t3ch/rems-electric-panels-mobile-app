import { Tabs } from 'expo-router';

const _Layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="board-list"
          options={{
            title: 'Boards',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="board-create"
          options={{
            title: 'Board Create',
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default _Layout;
