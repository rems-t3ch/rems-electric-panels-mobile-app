import { View, Text, TextInput, TextInputProps } from 'react-native';

/**
 * Props for the CustomInput component
 */
interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

/**
 * Custom Input
 *
 * @summary
 * Reusable text input with label and optional error message. Extends the
 * native TextInput props so it can be used for different input types while
 * keeping a consistent visual style across the app.
 *
 * @param {InputProps} props Input configuration props.
 * @returns {JSX.Element} The rendered input component.
 */
const CustomInput = ({ label, error, ...props }: InputProps) => {
  return (
    <View className="mb-3">
      <Text className="mb-1 text-sm text-white">{label}</Text>
      <TextInput
        className="rounded-xl border-2 border-secondary bg-transparent px-3 py-4 text-white"
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text className="mt-1 text-xs text-red-400">{error}</Text>}
    </View>
  );
};

export default CustomInput;
