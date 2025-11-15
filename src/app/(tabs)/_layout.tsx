import { Tabs } from 'expo-router';
import { Image, Text } from 'react-native';
import NavHomeIcon from '@assets/nav-home.png';
import NavBoardsListIcon from '@assets/nav-boards-list.png';
import NavCreateBoardIcon from '@assets/nav-boards-create.png';
import { View } from 'react-native';

/**
 * Props for the TabIcon component
 */
interface TabIconProps {
  source: any;
  label: string;
  focused: boolean;
}

/**
 * Tab Icon Component
 * @param {TabIconProps} - Props for the TabIcon component
 * @returns The rendered Tab Icon component
 */
const TabIcon = ({ source, label, focused }: TabIconProps) => {
  if (focused) {
    return (
      <View className="bg-secondary mt-2 flex min-h-16 min-w-[112px] flex-row items-center justify-center gap-2 rounded-full">
        <Image source={source} className="size-6" />
        <Text className="font-semibold">{label}</Text>
      </View>
    );
  }

  return (
    <View className="mt-2 flex min-w-[112px] flex-col items-center justify-center rounded-full p-2">
      <Image source={source} className="size-6" />
      <Text>{label}</Text>
    </View>
  );
};

/**
 * Layout Component for Tabs
 * @returns The rendered Layout component with Tabs
 */
const _Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#6A6A6A',
            height: 70,
            paddingBottom: 10,
            paddingTop: 12,
            position: 'absolute',
            marginBottom: 36,
            marginHorizontal: 24,
            paddingHorizontal: 3,
            borderRadius: 36,
            shadowColor: '#FFFFFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 10,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={NavHomeIcon} label="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="board-list"
          options={{
            title: 'Boards',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={NavBoardsListIcon} label="Dasboard" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="board-create"
          options={{
            title: 'Board Create',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={NavCreateBoardIcon} label="Create" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default _Layout;
