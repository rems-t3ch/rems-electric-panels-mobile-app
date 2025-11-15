import { Text, View, Alert, ActivityIndicator } from 'react-native';
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
    clearCurrentPanel 
  } = useElectronicPanel();
  const [initialData, setInitialData] = useState<Partial<BoardFormData> | undefined>(undefined);
  
  // Determinar modo edición basado en la ruta y parámetros
  const isEditMode = pathname === '/board/edit' && !!panelId;

  // Limpiar estado cuando se accede desde tab de creación
  useEffect(() => {
    if (pathname === '/(tabs)/board-create') {
      setInitialData(undefined);
      clearError();
      clearCurrentPanel();
    }
  }, [pathname]);

  useEffect(() => {
    if (isEditMode && panelId) {
      // Cargar datos del panel para editar
      fetchPanelById(panelId);
    } else {
      // Limpiar datos si no es modo edición
      setInitialData(undefined);
      clearCurrentPanel();
    }
  }, [panelId, isEditMode]);

  useEffect(() => {
    if (currentPanel && isEditMode) {
      // Mapear panel del dominio a datos del formulario
      const mapPanelStateToFormStatus = (state: PanelState): BoardFormData['status'] => {
        const stateMap: Record<PanelState, BoardFormData['status']> = {
          'operative': 'OPERATIVE',
          'maintenance': 'MAINTENANCE',
          'out_of_service': 'OUT OF SERVICE',
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

  const mapFormStatusToPanelState = (status: BoardFormData['status']): PanelState => {
    const statusMap: Record<BoardFormData['status'], PanelState> = {
      'OPERATIVE': 'operative',
      'MAINTENANCE': 'maintenance',
      'OUT OF SERVICE': 'out_of_service',
    };
    return statusMap[status];
  };

  const handleSave = async (data: BoardFormData) => {
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
        
        // Limpiar formulario después de crear
        setInitialData(undefined);
        clearCurrentPanel();
        
        Alert.alert('Success', 'Panel created successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Opcionalmente navegar a la lista
              router.push('/(tabs)/board-list');
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', error || `Failed to ${isEditMode ? 'update' : 'create'} panel`);
    }
  };

  const handleSavePress = () => {
    formRef.current?.submit();
  };

  return (
    <View className="flex min-h-full items-center gap-5 bg-primary pt-20">
      <Text className="text-4xl font-bold text-white">
        {isEditMode ? 'Edit Board' : 'Configure Board'}
      </Text>
      {initialData !== undefined || !isEditMode ? (
        <>
          <BoardForm ref={formRef} onSubmit={handleSave} initialData={initialData} isEditMode={isEditMode} />
          <CustomButton
            title={loading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update Configuration' : 'Save Configuration')}
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
  );
};

export default UpsertBoardScreen;
