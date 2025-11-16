import { View, Text, ScrollView, Platform, Pressable } from 'react-native';
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
  validate: () => string | null;
}

/**
 * Validation errors interface
 */
interface ValidationErrors {
  name?: string;
  brand?: string;
  amperageCapacity?: string;
  location?: string;
  dates?: string;
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

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showInstalledPicker, setShowInstalledPicker] = useState(false);
    const [showManufacturedPicker, setShowManufacturedPicker] = useState(false);

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
     * Validate form data
     * @returns Error message if validation fails, null otherwise
     */
    const validateForm = (): string | null => {
      const newErrors: ValidationErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.brand.trim()) {
        newErrors.brand = 'Brand is required';
      }

      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }

      const amperage = parseFloat(formData.amperageCapacity);
      if (isNaN(amperage) || amperage <= 0) {
        newErrors.amperageCapacity = 'Amperage capacity must be greater than 0';
      }

      const manufacturedYear = parseInt(formData.manufacturedDate, 10);
      const installedYear = parseInt(formData.installedDate, 10);

      if (isNaN(manufacturedYear) || manufacturedYear < 1900 || manufacturedYear > new Date().getFullYear()) {
        newErrors.dates = 'Invalid manufactured year';
      }

      if (isNaN(installedYear) || installedYear < 1900 || installedYear > new Date().getFullYear()) {
        newErrors.dates = 'Invalid installed year';
      }

      if (manufacturedYear && installedYear && installedYear < manufacturedYear) {
        newErrors.dates = 'Installation year cannot be before manufactured year';
      }

      setErrors(newErrors);

      const errorMessages = Object.values(newErrors);
      return errorMessages.length > 0 ? errorMessages.join('\n') : null;
    };

    /**
     * Expose submit and validate methods via ref
     */
    useImperativeHandle(ref, () => ({
      submit: () => {
        const validationError = validateForm();
        if (!validationError) {
          onSubmit(formData);
        }
      },
      validate: validateForm,
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
      if (Platform.OS === 'android') {
        setShowInstalledPicker(false);
      }

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
      /**
       * On Android the picker is modal — hide it after selection/dismiss
       */
      if (Platform.OS === 'android') {
        setShowManufacturedPicker(false);
      }

      if (selectedDate) {
        const year = selectedDate.getFullYear().toString();
        setFormData({ ...formData, manufacturedDate: year });
      }
    };

    return (
      <View className="min-w-full bg-primary px-6 pt-2">
        <ScrollView
          className="flex-grow-0 rounded-3xl border-2 border-white p-4"
          showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-1 px-2">
            <CustomInput
              label="Name"
              placeholder="Board name"
              value={formData.name}
              onChangeText={(text) => {
                setFormData({ ...formData, name: text });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              editable={!isEditMode}
              style={isEditMode ? { opacity: 0.5 } : {}}
              error={errors.name}
            />

            <CustomInput
              label="Brand"
              placeholder="Brand name"
              value={formData.brand}
              onChangeText={(text) => {
                setFormData({ ...formData, brand: text });
                if (errors.brand) setErrors({ ...errors, brand: undefined });
              }}
              editable={!isEditMode}
              style={isEditMode ? { opacity: 0.5 } : {}}
              error={errors.brand}
            />

            <CustomInput
              label="Amperage Capacity"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={formData.amperageCapacity}
              onChangeText={(text) => {
                setFormData({ ...formData, amperageCapacity: text });
                if (errors.amperageCapacity) setErrors({ ...errors, amperageCapacity: undefined });
              }}
              editable={!isEditMode}
              style={isEditMode ? { opacity: 0.5 } : {}}
              error={errors.amperageCapacity}
            />

            <CustomInput
              label="Location"
              placeholder="Location"
              value={formData.location}
              onChangeText={(text) => {
                setFormData({ ...formData, location: text });
                if (errors.location) setErrors({ ...errors, location: undefined });
              }}
              error={errors.location}
            />

            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <Text
                  className="mb-2 text-sm font-semibold text-white"
                  style={isEditMode ? { opacity: 0.5 } : {}}>
                  Installed
                </Text>
                <Pressable
                  onPress={() => {
                    if (!isEditMode) {
                      if (Platform.OS === 'android') setShowInstalledPicker(true);
                    }
                  }}
                  disabled={isEditMode}
                >
                  <View
                    className={`ml-2 overflow-hidden rounded-xl bg-white ${isEditMode ? 'opacity-50' : ''} px-3 py-3`}
                  >
                    <Text className="text-black">
                      {new Date(parseInt(formData.installedDate) || new Date().getFullYear(), 0, 1).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                </Pressable>

                {/*Render modal picker only on Android when requested. On iOS the compact picker remains inline.*/}
                {Platform.OS === 'android' && showInstalledPicker && (
                  <DateTimePicker
                    value={new Date(parseInt(formData.installedDate) || new Date().getFullYear(), 0, 1)}
                    mode="date"
                    display="default"
                    onChange={handleInstalledDateChange}
                    themeVariant="light"
                  />
                )}
                {Platform.OS !== 'android' && (
                  <View className={`ml-2 overflow-hidden rounded-xl bg-white ${isEditMode ? 'opacity-50' : ''}`}>
                    <DateTimePicker
                      value={new Date(parseInt(formData.installedDate) || new Date().getFullYear(), 0, 1)}
                      mode="date"
                      display="compact"
                      onChange={handleInstalledDateChange}
                      themeVariant="light"
                      disabled={isEditMode}
                    />
                  </View>
                )}
              </View>

            <View className="flex-1 ">
              <Text
                className="mb-2 text-sm font-semibold text-white"
                style={isEditMode ? { opacity: 0.5 } : {}}>
                Manufactured
              </Text>
              <Pressable
                onPress={() => {
                  if (!isEditMode) {
                    if (Platform.OS === 'android') setShowManufacturedPicker(true);
                  }
                }}
                disabled={isEditMode}
              >
                <View className={`ml-2 overflow-hidden rounded-xl bg-white ${isEditMode ? 'opacity-50' : ''} px-3 py-3`}>
                  <Text className="text-black">
                    {new Date(parseInt(formData.manufacturedDate) || new Date().getFullYear(), 0, 1).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
              </Pressable>

              {Platform.OS === 'android' && showManufacturedPicker && (
                <DateTimePicker
                  value={new Date(parseInt(formData.manufacturedDate) || new Date().getFullYear(), 0, 1)}
                  mode="date"
                  display="default"
                  onChange={handleManufacturedDateChange}
                  themeVariant="light"
                />
              )}

              {Platform.OS !== 'android' && (
                <View className={`ml-2 overflow-hidden rounded-xl bg-white ${isEditMode ? 'opacity-50' : ''}`}>
                  <DateTimePicker
                    value={new Date(parseInt(formData.manufacturedDate) || new Date().getFullYear(), 0, 1)}
                    mode="date"
                    display="compact"
                    onChange={handleManufacturedDateChange}
                    themeVariant="light"
                    disabled={isEditMode}
                  />
                </View>
              )}
            </View>
            </View>

            {errors.dates && (
              <Text className="text-xs text-red-400 mt-1">{errors.dates}</Text>
            )}

            <View className="mt-4 flex flex-row gap-2">
              <CustomButton
                title="OPERATIVE"
                onPress={() => handleStatusChange('OPERATIVE')}
                variant={formData.status === 'OPERATIVE' ? 'primary' : 'outline'}
                className="flex-1 px-2 py-3"
                textClassName="text-[8px]"
              />

              <CustomButton
                title="MAINTENANCE"
                onPress={() => handleStatusChange('MAINTENANCE')}
                variant={formData.status === 'MAINTENANCE' ? 'primary' : 'outline'}
                className="flex-1 px-2 py-3"
                textClassName="text-[8px]"
              />

              <CustomButton
                title="OUT OF SERVICE"
                onPress={() => handleStatusChange('OUT OF SERVICE')}
                variant={formData.status === 'OUT OF SERVICE' ? 'primary' : 'outline'}
                className="flex-1 px-1 py-5"
                textClassName="text-[8px] leading-tight"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
);

export default BoardForm;
