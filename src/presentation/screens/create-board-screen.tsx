import { Text, View } from 'react-native';
import { useRef } from 'react';
import BoardForm, { BoardFormRef } from '../components/board-form';
import CustomButton from '@/shared/components/custom-button';

/**
 * Create Board Screen
 *
 * @summary
 * Screen responsible for creating a new board using the shared BoardForm
 * component.
 *
 * @returns {JSX.Element} The CreateBoardScreen component.
 */
const CreateBoardScreen = () => {
  const formRef = useRef<BoardFormRef>(null);

  const handleSave = (data: any) => {
    console.log('Saving board data:', data);
    //TODO: Implement actual save logic here
  };

  const handleSavePress = () => {
    formRef.current?.submit();
  };

  return (
    <View className="flex min-h-full items-center gap-5 bg-primary pt-20">
      <Text className="text-4xl font-bold text-white">Configure Board</Text>
      <BoardForm ref={formRef} onSubmit={handleSave} />
      <CustomButton
        title="Save Configuration"
        onPress={handleSavePress}
        variant="primary"
        className="mx-6 mb-6 px-6 py-4"
      />
    </View>
  );
};

export default CreateBoardScreen;
