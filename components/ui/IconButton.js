import { Pressable, StyleSheet, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.butotnContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  butotnContainer: {
    padding: 6,
    borderRadius: 24,
    marginHorizontal: 5,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
});
