import { TouchableOpacity, Text } from 'react-native';

/**
 * Props for the CustomButton component
 */
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
}

/**
 * Custom Button
 *
 * @summary
 * Reusable button component that supports primary, secondary and outline
 * variants, and allows extending both container and text styles with
 * Tailwind/NativeWind classes.
 *
 * @remarks
 * Supported variants:
 * - **primary** → Light button (secondary color) with dark text for emphasis.
 * - **secondary** → Dark button (primary color) with white text for contrast.
 * - **outline** → Transparent button with white border and text, ideal for low-emphasis actions.
 *
 * @param {CustomButtonProps} props Button configuration props.
 * @returns {JSX.Element} The rendered button component.
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  className = '',
  textClassName = '',
}: CustomButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-secondary border-secondary';
      case 'secondary':
        return 'bg-primary border-white';
      case 'outline':
        return 'bg-transparent border-white';
      default:
        return 'bg-secondary border-secondary';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-black';
      case 'secondary':
      case 'outline':
        return 'text-white';
      default:
        return 'text-black';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center justify-center rounded-xl border-2 ${getVariantStyles()} ${className}`}>
      <Text className={`font-bold ${getTextStyles()} ${textClassName || 'text-base'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
