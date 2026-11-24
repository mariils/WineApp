import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WineCard from "../../components/WineCard";
import { wines } from "../../data/wines";
import { useApp } from "../../context/AppContext";
import { colors } from "../../constants/colors";

export default function Favoritos() {
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite, addToCart } = useApp();
  const lista = wines.filter((w) => favorites.includes(w.id));

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Favoritos</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={44} color={colors.wine} />
            <Text style={styles.emptyTitle}>Nada por aqui ainda</Text>
            <Text style={styles.emptyText}>
              Toque no coração de um vinho no catálogo para guardá-lo aqui.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <WineCard
            wine={item}
            favorite
            onToggleFavorite={() => toggleFavorite(item.id)}
            onAdd={() => addToCart(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  title: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 26,
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  list: { padding: 16, paddingBottom: 32 },
  row: { gap: 12, marginBottom: 12 },
  empty: { alignItems: "center", marginTop: 80, paddingHorizontal: 32 },
  emptyTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 20,
    color: colors.text,
    marginTop: 12,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 6,
  },
});