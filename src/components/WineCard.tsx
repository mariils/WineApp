import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Wine } from "../types/wine";
import { colors } from "../constants/colors";

type Props = {
  wine: Wine;
  favorite: boolean;
  onToggleFavorite: () => void;
  onAdd: () => void;
};

export default function WineCard({ wine, favorite, onToggleFavorite, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        {wine.image ? (
          <Image source={{ uri: wine.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <Ionicons name="wine-outline" size={48} color={colors.wine} />
        )}
        <Pressable style={styles.heart} onPress={onToggleFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={16}
            color={colors.wine}
          />
        </Pressable>
      </View>

      <Text style={styles.grape}>{wine.grape.toUpperCase()}</Text>
      <Text style={styles.name} numberOfLines={1}>{wine.name}</Text>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={12} color={colors.gold} />
        <Text style={styles.rating}>{wine.rating.toFixed(1)}</Text>
        <Text style={styles.reviews}>({wine.reviews})</Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>R$ {wine.price}</Text>
        <Pressable style={styles.addButton} onPress={onAdd}>
          <Ionicons name="add" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    shadowColor: colors.wine,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageBox: {
    height: 150,
    borderRadius: 14,
    backgroundColor: colors.creamDark,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  grape: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1,
    color: colors.wineLight,
    marginTop: 10,
  },
  name: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 16,
    color: colors.text,
    marginTop: 2,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  rating: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.text },
  reviews: { fontFamily: "Inter_400Regular", fontSize: 11, color: colors.textMuted },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  price: { fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
  },
});