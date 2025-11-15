import { Image, Text, View, TouchableOpacity, Modal, Animated } from 'react-native';
import ProfilePhoto from '@assets/profile-photo.png';
import { useState, useRef } from 'react';

/**
 * Home Screen Component
 * @returns The rendered Home Screen component
 */
export default function HomeScreen() {
  /**
   * State and animation for modal visibility and button press effect
   */
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * Handle button press with animation and modal display
   */
  const handlePress = () => {
    /**
     * Button press animation sequence
     */
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: false,
        speed: 50,
        bounciness: 12,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: false,
        speed: 50,
        bounciness: 12,
      }),
    ]).start(() => {
      setModalVisible(true);
    });
  };

  return (
    <>
      <View className="flex min-h-full items-center justify-center bg-primary">
        <View className="-mt-6 flex flex-col items-center justify-center gap-3">
          <Image source={ProfilePhoto} className="h-44 w-44 rounded-full" />
          <Text className="max-w-[200px] text-center text-3xl text-white">
            Gonzalo Andre Zavala Quedena
          </Text>
          <Text className="text-blue-300">gonzalo.qu3dena@outlook.com</Text>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={handlePress}
              className="mt-4 rounded-full bg-coral px-6 py-3">
              <Text className="text-center font-semibold text-white">
                ¿Por qué deberían contratarme?
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/60">
          <View className="mx-6 rounded-3xl bg-white p-6 shadow-lg">
            <Text className="mb-6 text-justify text-base leading-6">
              Mi propuesta de valor combina rendimiento técnico y visión a largo plazo. No solo
              puedo entregar una aplicación funcional y bien estructurada, sino que aplico prácticas
              de ingeniería de software que garantizan escalabilidad, mantenibilidad y crecimiento
              continuo del proyecto. Además, me veo como una inversión para la empresa: mi objetivo
              es capacitarme, especializarme y construir una línea de carrera sólida dentro de REMS,
              asegurando que el conocimiento adquirido se mantenga y evolucione dentro del equipo.
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="self-end rounded-xl px-6 py-3"
              style={{
                backgroundColor: '#E0E0E0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <Text className="font-semibold text-black">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
