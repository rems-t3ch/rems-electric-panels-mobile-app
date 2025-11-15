import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { icons } from '@/shared/constants/icons';
import { router } from 'expo-router';
import { ElectricalPanel } from '@/domain/electrical-panel';
import { PANEL_STATES } from '@/domain/electrical-panel-states';

/**
 * Props for BoardItem component
 */
interface BoardItemProps {
  panel: ElectricalPanel;
  onDelete: (id: string) => void;
}

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
const BoardItem = ({ panel, onDelete }: BoardItemProps) => {
  const getStatusColor = (state: string) => {
    const colors: Record<string, string> = {
      operative: '#16a34a',
      maintenance: '#eab308',
      out_of_service: '#dc2626',
    };
    return colors[state] || '#6b7280';
  };

  /**
   * Handle edit action for the panel
   */
  const handleEdit = () => {
    router.push({
      pathname: '/board/edit',
      params: { id: panel.id },
    });
  };

  /**
   * Handle delete action for the panel
   */
  const handleDelete = () => {
    Alert.alert('Delete Panel', `Are you sure you want to delete "${panel.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(panel.id),
      },
    ]);
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
        <View
          className="h-20 w-20 rounded-full"
          style={{ backgroundColor: getStatusColor(panel.state) }}></View>
        <Text className="text-xs font-bold uppercase">{PANEL_STATES[panel.state]}</Text>
      </View>

      <View className="flex flex-1 flex-col justify-center px-6">
        <Text className="text-lg font-bold" numberOfLines={1} ellipsizeMode="tail">
          {panel.name}
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
          {panel.location}
        </Text>

        <View className="mt-3 items-end">
          <Text className="text-base font-semibold">{panel.brand}</Text>
          <Text className="text-sm text-gray-600">{panel.year_installed}</Text>
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
