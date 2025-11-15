import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import BoardForm, { BoardFormRef, BoardFormData } from '../components/board-form';
import CustomButton from '@/shared/components/custom-button';
import { useElectronicPanel } from '@/application/useElectronicPanel';
import { PanelState, PANEL_STATES } from '@/domain/electrical-panel-states';

/**
 * Create Board Screen
 *
 * @summary
 * Screen responsible for creating a new board using the shared BoardForm
 * component.
 *
 * @returns {JSX.Element} The UpsertBoardScreen component.
 */
const UpsertBoardScreen = () => {
  const formRef = useRef<BoardFormRef>(null);
  const params = useLocalSearchParams();
  const pathname = usePathname();
  const panelId = params.id as string | undefined;
  const {
    createPanel,
    updatePanel,
    fetchPanelById,
    currentPanel,
    loading,
    error,
    clearError,
    clearCurrentPanel,
  } = useElectronicPanel();
  const [initialData, setInitialData] = useState<Partial<BoardFormData> | undefined>(undefined);

  /**
   * Determine edit mode based on the route and parameters
   */
  const isEditMode = pathname === '/board/edit' && !!panelId;

  /**
   * Clear state when accessing from create tab
   */
  useEffect(() => {
    if (pathname === '/(tabs)/board-create') {
      setInitialData(undefined);
      clearError();
      clearCurrentPanel();
    }
  }, [pathname]);

  useEffect(() => {
    if (isEditMode && panelId) {
      fetchPanelById(panelId);
    } else {
      setInitialData(undefined);
      clearCurrentPanel();
    }
  }, [panelId, isEditMode]);

  /**
   * Populate form initial data when currentPanel is loaded in edit mode
   */
  useEffect(() => {
    if (currentPanel && isEditMode) {
      const mapPanelStateToFormStatus = (state: PanelState): BoardFormData['status'] => {
        const stateMap: Record<PanelState, BoardFormData['status']> = {
          operative: 'OPERATIVE',
          maintenance: 'MAINTENANCE',
          out_of_service: 'OUT OF SERVICE',
        };
        return stateMap[state];
      };

      setInitialData({
        name: currentPanel.name,
        brand: currentPanel.brand,
        amperageCapacity: currentPanel.amperage_capacity.toString(),
        location: currentPanel.location,
        installedDate: currentPanel.year_installed.toString(),
        manufacturedDate: currentPanel.year_manufactured.toString(),
        status: mapPanelStateToFormStatus(currentPanel.state),
      });
    }
  }, [currentPanel, isEditMode]);

  /**
   * Map form status to panel state
   * @param status The status from the form
   * @returns Corresponding panel state
   */
  const mapFormStatusToPanelState = (status: BoardFormData['status']): PanelState => {
    const statusMap: Record<BoardFormData['status'], PanelState> = {
      OPERATIVE: 'operative',
      MAINTENANCE: 'maintenance',
      'OUT OF SERVICE': 'out_of_service',
    };
    return statusMap[status];
  };

  /**
   * Handle save action for creating or updating a panel
   * @param data The data from the form
   * @returns True if successful, false otherwise
   */
  const handleSave = async (data: BoardFormData) => {
    const validationError = formRef.current?.validate();
    if (validationError) {
      Alert.alert('Validation Error', validationError);
      return;
    }

    try {
      const payload = {
        name: data.name,
        location: data.location,
        brand: data.brand,
        amperage_capacity: parseFloat(data.amperageCapacity) || 0,
        state: mapFormStatusToPanelState(data.status),
        year_manufactured: parseInt(data.manufacturedDate, 10),
        year_installed: parseInt(data.installedDate, 10),
      };

      if (isEditMode && panelId) {
        await updatePanel(panelId, payload);
        Alert.alert('Success', 'Panel updated successfully', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        await createPanel(payload);
        setInitialData(undefined);
        clearCurrentPanel();

        Alert.alert('Success', 'Panel created successfully', [
          {
            text: 'OK',
            onPress: () => {
              router.push('/(tabs)/board-list');
            },
          },
        ]);
      }
    } catch (err: any) {
      let errorMessage = error || `Failed to ${isEditMode ? 'update' : 'create'} panel`;

      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail
            .map((e: any) => `${e.loc?.[1] || 'Field'}: ${e.msg}`)
            .join('\n');
        } else if (typeof err.response.data.detail === 'string') {
          errorMessage = err.response.data.detail;
        }
      }

      Alert.alert('Error', errorMessage);
    }
  };

  /**
   * Handle save button press
   */
  const handleSavePress = () => {
    formRef.current?.submit();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="flex items-center gap-4 pb-8 pt-20">
          <Text className="text-4xl font-bold text-white">
            {isEditMode ? 'Edit Panel' : 'Configure Panel'}
          </Text>

          {initialData !== undefined || !isEditMode ? (
            <>
              <BoardForm
                ref={formRef}
                onSubmit={handleSave}
                initialData={initialData}
                isEditMode={isEditMode}
              />
              <CustomButton
                title={
                  loading
                    ? isEditMode
                      ? 'Updating...'
                      : 'Saving...'
                    : isEditMode
                      ? 'Update Configuration'
                      : 'Save Configuration'
                }
                onPress={handleSavePress}
                variant="primary"
                className="mx-6 mb-6 px-6 py-4"
                disabled={loading}
              />
            </>
          ) : (
            <ActivityIndicator size="large" color="#ffffff" />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpsertBoardScreen;
