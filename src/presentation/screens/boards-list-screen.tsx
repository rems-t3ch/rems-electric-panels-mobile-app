import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import BoardItem from '../components/board-item';
import { useElectronicPanel } from '@/application/useElectronicPanel';

/**
 * Boards List Screen
 *
 * @summary
 * Displays the list of boards available to the user.
 *
 * @returns {JSX.Element} The BoardsListScreen component.
 */
const BoardsListScreen = () => {
  const { panels, loading, error, fetchPanels, deletePanel } = useElectronicPanel();
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Loading panels on component mount
   */
  useEffect(() => {
    fetchPanels();
  }, []);

  /**
   * Refresh panels when the screen gains focus
   */
  useFocusEffect(
    useCallback(() => {
      fetchPanels();
    }, [])
  );

  /**
   * Handle pull-to-refresh action
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPanels();
    setRefreshing(false);
  };

  /**
   * Handle delete action for a panel
   * @param id The ID of the panel to delete
   */
  const handleDelete = async (id: string) => {
    await deletePanel(id);
    fetchPanels();
  };

  return (
    <View className="min-h-full bg-primary pt-20">
      <Text className="text-center text-4xl font-bold text-white">Panels</Text>

      {loading && !refreshing && (
        <View className="mt-10">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}

      {error && (
        <View className="mx-4 mt-4 rounded-lg bg-red-500 p-4">
          <Text className="text-center text-white">{error}</Text>
        </View>
      )}

      <FlatList
        className="mt-5 flex-1"
        data={panels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BoardItem panel={item} onDelete={handleDelete} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() =>
          !loading && <Text className="mt-10 text-center text-white">No panels found</Text>
        }
      />
    </View>
  );
};

export default BoardsListScreen;
