import { Text, View } from "react-native";
import BoardItem from "../components/board-item";

/**
 * Boards List Screen
 *
 * @summary
 * Displays the list of boards available to the user.
 *
 * @returns {JSX.Element} The BoardsListScreen component.
 */
const BoardsListScreen = () => {
    return (
        <>
          <View className="flex items-center min-h-full pt-20 gap-5 bg-primary">
            <Text className="text-white text-4xl font-bold">Boards</Text>
            <BoardItem />
          </View>
        </>
      );
};

export default BoardsListScreen;