import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

const tipos = ["Tinto", "Branco", "Rosé", "Espumante"];

export default function Inicio() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tipo, setTipo] = useState("Tinto");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.wineLight, colors.wine, colors.wineDark]}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <Image
          source={require("../../../assets/images/logocat.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.greeting}>OLÁ, VISITANTE</Text>
        <Text style={styles.brand}>NonaVida</Text>
        <Text style={styles.tagline}>
          Vinhos que combinam com a sua história.
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={18} color={colors.wine} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar vinhos, uvas, regiões..."
            placeholderTextColor={colors.textMuted}
          />
          <Pressable style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color={colors.wine} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {tipos.map((item) => {
            const ativo = item === tipo;
            return (
              <Pressable
                key={item}
                onPress={() => setTipo(item)}
                style={[styles.chip, ativo && styles.chipActive]}
              >
                <Text style={[styles.chipText, ativo && styles.chipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.eyebrow}>COMECE POR AQUI</Text>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Como quer descobrir?</Text>
          <Ionicons name="sparkles-outline" size={18} color={colors.wine} />
        </View>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/catalogo")}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="grid-outline" size={22} color={colors.wine} />
          </View>
          <View style={styles.cardTexts}>
            <Text style={styles.cardEyebrow}>MAIS DE 200 RÓTULOS</Text>
            <Text style={styles.cardTitle}>Explorar catálogo</Text>
            <Text style={styles.cardDesc}>
              Navegue por origens, uvas e ocasiões.
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textMuted}
          />
        </Pressable>

        <Pressable
          style={[styles.card, styles.cardWine]}
          onPress={() => console.log("Perfil de vinho")}
        >
          <View style={[styles.cardIcon, styles.cardIconWine]}>
            <Ionicons name="options-outline" size={22} color="#FFFFFF" />
          </View>
          <View style={styles.cardTexts}>
            <Text style={[styles.cardEyebrow, { color: colors.gold }]}>
              PERSONALIZADO PARA VOCÊ
            </Text>
            <Text style={[styles.cardTitle, { color: "#FFFFFF" }]}>
              Seu perfil de vinho
            </Text>
            <Text style={[styles.cardDesc, { color: colors.cream }]}>
              Entre e responda 5 perguntas para receber sua curadoria.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.cream} />
        </Pressable>

        <Pressable
          style={styles.outlineButton}
          onPress={() => console.log("Entrar / Cadastrar")}
        >
          <Text style={styles.outlineButtonText}>Entrar / Cadastrar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { paddingBottom: 32 },
  header: {
    alignItems: "center",
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  logo: { width: 56, height: 56 },
  greeting: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.cream,
    marginTop: 10,
  },
  brand: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 32,
    color: "#FFFFFF",
    marginTop: 4,
  },
  tagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.gold,
    marginTop: 4,
    textAlign: "center",
  },
  body: { paddingHorizontal: 20, marginTop: -26 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    gap: 10,
    shadowColor: colors.wine,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.text,
    paddingVertical: 6,
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.creamDark,
    alignItems: "center",
    justifyContent: "center",
  },
  chips: { gap: 8, paddingVertical: 16 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.creamDark,
    backgroundColor: "#FFFFFF",
  },
  chipActive: { backgroundColor: colors.wine, borderColor: colors.wine },
  chipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: colors.text,
  },
  chipTextActive: { color: "#FFFFFF" },
  eyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.wineLight,
    marginTop: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
    color: colors.text,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    gap: 14,
    marginBottom: 14,
    shadowColor: colors.wine,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardWine: { backgroundColor: colors.wine },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.creamDark,
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconWine: { backgroundColor: "rgba(255,255,255,0.15)" },
  cardTexts: { flex: 1 },
  cardEyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1,
    color: colors.wineLight,
  },
  cardTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 17,
    color: colors.text,
    marginTop: 2,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: colors.wine,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 6,
  },
  outlineButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.wine,
  },
});