import UpsertBoardScreen from '@/presentation/screens/upsert-board-screen';

/**
 * Board Edit Route (Stack Navigation)
 * 
 * @summary 
 * Renders the UpsertBoardScreen in edit mode outside of tab navigation.
 * This allows for stack navigation (overlay) when editing an existing panel.
 * 
 * @returns {JSX.Element} The Board Edit screen component.
 */
const BoardEdit = () => {
  return <UpsertBoardScreen />;
};

export default BoardEdit;
