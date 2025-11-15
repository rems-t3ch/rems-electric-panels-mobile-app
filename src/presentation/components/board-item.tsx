import { Text, View, TouchableOpacity, Image } from 'react-native';
import { icons } from '@/shared/constants/icons';
import { router } from 'expo-router';

/**
 * Board Item Component
 *
 * @summary
 * Renders a single board item with its details and action icons
 * (edit and delete). This component is used inside the Board List
 * screen and represents one board entry in the list.
 *
 * @returns {JSX.Element} The rendered BoardItem component.
 */
const BoardItem = () => {
  
  const handleEdit = () => {
    // TODO: Navigate to edit screen
  };

  const handleDelete = () => {
    // TODO: Handle delete action
  };

  return (
    <View
      className="mx-4 flex flex-row items-center justify-between rounded-3xl bg-gray-200 p-4"
      style={{
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
      }}>
      <View className="flex flex-col items-center gap-2">
        <View className="h-20 w-20 rounded-full bg-green-600"></View>
        <Text className="text-xs font-bold uppercase">OPERATIVE</Text>
      </View>

      <View className="flex flex-1 flex-col justify-center px-6">
        <Text className="text-lg font-bold" numberOfLines={1} ellipsizeMode="tail">
          Main Distribution Panel
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
          Building A - Basement
        </Text>

        <View className="mt-3 items-end">
          <Text className="text-base font-semibold">SIEMENS</Text>
          <Text className="text-sm text-gray-600">2021</Text>
        </View>
      </View>

      <View className="flex flex-col gap-3">
        <TouchableOpacity
          onPress={handleEdit}
          className="items-center justify-center rounded-2xl bg-secondary px-4 py-3">
          <Image source={icons.edit} className="h-6 w-6" />
          <Text className="mt-1 text-xs font-semibold">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          className="items-center justify-center rounded-2xl bg-red-400 px-4 py-3">
          <Image source={icons.trash} className="h-6 w-6" />
          <Text className="mt-1 text-xs font-semibold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardItem;
