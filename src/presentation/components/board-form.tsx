import { View, Text, ScrollView, Platform } from 'react-native';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import CustomInput from '@/shared/components/custom-input';
import CustomButton from '@/shared/components/custom-button';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Props for the BoardForm component
 */
export interface BoardFormData {
  name: string;
  brand: string;
  amperageCapacity: string;
  location: string;
  installedDate: string;
  manufacturedDate: string;
  status: 'OPERATIVE' | 'MAINTENANCE' | 'OUT OF SERVICE';
}

/**
 * Props for the BoardForm component
 */
interface BoardFormProps {
  initialData?: Partial<BoardFormData>;
  onSubmit: (data: BoardFormData) => void;
  isEditMode?: boolean;
}

/**
 * Ref interface for the BoardForm component
 */
export interface BoardFormRef {
  submit: () => void;
}

/**
 * Board Form Component
 *
 * @summary
 * Form used to create or update a board, handling validation-like behavior
 * and standardized input formatting for each board field.
 *
 * @remarks
 * Managed fields:
 * - **name**: Board display name.
 * - **brand**: Manufacturer or model reference.
 * - **amperageCapacity**: Maximum amperage capacity (string-based).
 * - **location**: Physical installation location.
 * - **installedDate**: Installation date (YYYY-MM-DD).
 * - **manufacturedDate**: Manufacturing date (YYYY-MM-DD).
 * - **status**: One of: `OPERATIVE` | `MAINTENANCE` | `OUT OF SERVICE`.
 *
 * @param {BoardFormProps} props
 * Props containing initialData for edit mode and an onSubmit callback.
 *
 * @returns {JSX.Element} The fully controlled board form component.
 */
const BoardForm = forwardRef<BoardFormRef, BoardFormProps>(
  ({ initialData, onSubmit, isEditMode = false }, ref) => {
    const [formData, setFormData] = useState<BoardFormData>({
      name: initialData?.name || '',
      brand: initialData?.brand || '',
      amperageCapacity: initialData?.amperageCapacity || '0.00',
      location: initialData?.location || '',
      installedDate: initialData?.installedDate || new Date().getFullYear().toString(),
      manufacturedDate: initialData?.manufacturedDate || new Date().getFullYear().toString(),
      status: initialData?.status || 'OPERATIVE',
    });

    /**
     * Effect to update form data when initialData changes (for edit mode)
     */
    useEffect(() => {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          brand: initialData.brand || '',
          amperageCapacity: initialData.amperageCapacity || '0.00',
          location: initialData.location || '',
          installedDate: initialData.installedDate || new Date().getFullYear().toString(),
          manufacturedDate: initialData.manufacturedDate || new Date().getFullYear().toString(),
          status: initialData.status || 'OPERATIVE',
        });
      } else {
        setFormData({
          name: '',
          brand: '',
          amperageCapacity: '0.00',
          location: '',
          installedDate: new Date().getFullYear().toString(),
          manufacturedDate: new Date().getFullYear().toString(),
          status: 'OPERATIVE',
        });
      }
    }, [initialData]);

    /**
     * Expose submit method via ref
     */
    useImperativeHandle(ref, () => ({
      submit: () => {
        onSubmit(formData);
      },
    }));

    /**
     * Handle status change
     * @param status The new status of the board
     */
    const handleStatusChange = (status: BoardFormData['status']) => {
      setFormData({ ...formData, status });
    };

    /**
     * Handle installed date change
     * @param event The date change event
     * @param selectedDate The selected date
     */
    const handleInstalledDateChange = (event: any, selectedDate?: Date) => {
      if (selectedDate) {
        const year = selectedDate.getFullYear().toString();
        setFormData({ ...formData, installedDate: year });
      }
    };

    /**
     * Handle manufactured date change
     * @param event The date change event
     * @param selectedDate The selected date
     */
    const handleManufacturedDateChange = (event: any, selectedDate?: Date) => {
      if (selectedDate) {
        const year = selectedDate.getFullYear().toString();
        setFormData({ ...formData, manufacturedDate: year });
      }
    };

    return (
      <View className="min-w-full bg-primary px-6 pt-6">
        <ScrollView
          className="flex-grow-0 rounded-3xl border-2 border-white p-4"
          showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-2 px-2">
            <CustomInput
              label="Name"
              placeholder="Board name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              editable={!isEditMode}
              style={isEditMode ? { opacity: 0.5 } : {}}
            />

            <CustomInput
              label="Brand"
              placeholder="Brand name"
              value={formData.brand}
              onChangeText={(text) => setFormData({ ...formData, brand: text })}
              editable={!isEditMode}
              style={isEditMode ? { opacity: 0.5 } : {}}
            />

            <CustomInput
              label="Amperage Capacity"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={formData.amperageCapacity}
              onChangeText={(text) => setFormData({ ...formData, amperageCapacity: text })}
              editable={!isEditMode}
              style={isEditMode ? { opacity: 0.5 } : {}}
            />

            <CustomInput
              label="Location"
              placeholder="Location"
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />

            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <Text
                  className="mb-2 text-sm font-semibold text-white"
                  style={isEditMode ? { opacity: 0.5 } : {}}>
                  Installed
                </Text>
                <View
                  className={`ml-2 overflow-hidden rounded-xl bg-white ${isEditMode ? 'opacity-50' : ''}`}>
                  <DateTimePicker
                    value={
                      new Date(parseInt(formData.installedDate) || new Date().getFullYear(), 0, 1)
                    }
                    mode="date"
                    display="compact"
                    onChange={handleInstalledDateChange}
                    themeVariant="light"
                    disabled={isEditMode}
                  />
                </View>
              </View>

              <View className="flex-1 ">
                <Text
                  className="mb-2 text-sm font-semibold text-white"
                  style={isEditMode ? { opacity: 0.5 } : {}}>
                  Manufactured
                </Text>
                <View
                  className={`ml-2 overflow-hidden rounded-xl bg-white ${isEditMode ? 'opacity-50' : ''}`}>
                  <DateTimePicker
                    value={
                      new Date(
                        parseInt(formData.manufacturedDate) || new Date().getFullYear(),
                        0,
                        1
                      )
                    }
                    mode="date"
                    display="compact"
                    onChange={handleManufacturedDateChange}
                    themeVariant="light"
                    disabled={isEditMode}
                  />
                </View>
              </View>
            </View>

            <View className="mt-4 flex flex-row gap-2">
              <CustomButton
                title="OPERATIVE"
                onPress={() => handleStatusChange('OPERATIVE')}
                variant={formData.status === 'OPERATIVE' ? 'primary' : 'outline'}
                className="flex-1 px-2 py-3"
                textClassName="text-xs"
              />

              <CustomButton
                title="MAINTENANCE"
                onPress={() => handleStatusChange('MAINTENANCE')}
                variant={formData.status === 'MAINTENANCE' ? 'primary' : 'outline'}
                className="flex-1 px-2 py-3"
                textClassName="text-xs"
              />

              <CustomButton
                title="OUT OF SERVICE"
                onPress={() => handleStatusChange('OUT OF SERVICE')}
                variant={formData.status === 'OUT OF SERVICE' ? 'primary' : 'outline'}
                className="flex-1 px-1 py-5"
                textClassName="text-xs leading-tight"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
);

export default BoardForm;
