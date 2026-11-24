import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WineCard from "../../components/WineCard";
import { wines } from "../../data/wine";
import { useApp } from "../../context/AppContext";
import { colors } from "../../constants/colors";

export default function Catalogo() {
  const insets = useSafeAreaInsets();
  const [busca, setBusca] = useState("");
  const { favorites, toggleFavorite, addToCart } = useApp();

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return wines;
    return wines.filter(
      (w) =>
        w.name.toLowerCase().includes(termo) ||
        w.grape.toLowerCase().includes(termo) ||
        w.region.toLowerCase().includes(termo)
    );
  }, [busca]);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.wineLight, colors.wine, colors.wineDark]}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <Text style={styles.headerTitle}>Descobrir</Text>
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={18} color={colors.wine} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar rótulos..."
            placeholderTextColor={colors.textMuted}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
        <View style={styles.filters}>
          {["Uva", "Região", "Preço"].map((f) => (
            <Pressable key={f} style={styles.filter}>
              <Text style={styles.filterText}>{f}</Text>
              <Ionicons name="chevron-down" size={12} color={colors.cream} />
            </Pressable>
          ))}
        </View>
      </LinearGradient>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View>
              <Text style={styles.eyebrow}>CURADORIA NONAVIDA</Text>
              <Text style={styles.sectionTitle}>Seleção da casa</Text>
            </View>
            <Text style={styles.count}>{lista.length} vinhos</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum vinho encontrado.</Text>
        }
        renderItem={({ item }) => (
          <WineCard
            wine={item}
            favorite={favorites.includes(item.id)}
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
  header: { paddingHorizontal: 20, paddingBottom: 18 },
  headerTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 14,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.text,
    paddingVertical: 8,
  },
  filters: { flexDirection: "row", gap: 8, marginTop: 12 },
  filter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  filterText: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.cream },
  list: { padding: 16, paddingBottom: 32 },
  row: { gap: 12, marginBottom: 12 },
  listHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  eyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.wineLight,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
    color: colors.text,
  },
  count: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.gold },
  empty: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 32,
  },
});