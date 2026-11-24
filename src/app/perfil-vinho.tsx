import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WineCard from "../components/WineCard";
import { wines } from "../data/wines";
import { Answers, questions, recommend } from "../data/quiz";
import { useApp } from "../context/AppContext";
import { colors } from "../constants/colors";

export default function PerfilVinho() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite, addToCart } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const finished = step >= questions.length;
  const question = questions[step];
  const progress = finished ? 1 : (step + 1) / questions.length;

  function answer(option: string) {
    setAnswers((current) => ({ ...current, [question.id]: option }));
    setStep((current) => current + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  function goBack() {
    if (step > 0 && !finished) setStep(step - 1);
    else router.back();
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.wineLight, colors.wine, colors.wineDark]}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerRow}>
          <Pressable style={styles.back} onPress={goBack}>
            <Ionicons name="arrow-back" size={20} color={colors.wine} />
          </Pressable>
          <Text style={styles.headerText}>
            {finished
              ? "Sua curadoria"
              : `Pergunta ${step + 1} de ${questions.length}`}
          </Text>
          <View style={styles.back} />
        </View>
        <View style={styles.track}>
          <View style={[styles.bar, { width: `${progress * 100}%` }]} />
        </View>
      </LinearGradient>

      {!finished ? (
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.eyebrow}>SEU PERFIL DE VINHO</Text>
          <Text style={styles.title}>{question.title}</Text>

          {question.options.map((option) => {
            const selected = answers[question.id] === option;
            return (
              <Pressable
                key={option}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => answer(option)}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {option}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={selected ? "#FFFFFF" : colors.textMuted}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        <FlatList
          data={recommend(wines, answers)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.resultHeader}>
              <Text style={styles.eyebrow}>PERSONALIZADO PARA VOCÊ</Text>
              <Text style={styles.title}>Estes vinhos combinam com você</Text>
              <Text style={styles.subtitle}>
                Escolhidos a partir das suas 5 respostas.
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <Pressable style={styles.primary} onPress={() => router.push("/catalogo")}>
                <Text style={styles.primaryText}>Ver catálogo completo</Text>
              </Pressable>
              <Pressable style={styles.secondary} onPress={restart}>
                <Text style={styles.secondaryText}>Refazer questionário</Text>
              </Pressable>
            </View>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.cream },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },
  bar: { height: 4, borderRadius: 2, backgroundColor: colors.gold },
  body: { padding: 24, paddingBottom: 40 },
  eyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.wineLight,
  },
  title: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 26,
    color: colors.text,
    marginTop: 6,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.creamDark,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  optionSelected: { backgroundColor: colors.wine, borderColor: colors.wine },
  optionText: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.text },
  optionTextSelected: { color: "#FFFFFF" },
  list: { padding: 16, paddingBottom: 32 },
  row: { gap: 12, marginBottom: 12 },
  resultHeader: { marginBottom: 6, paddingHorizontal: 4 },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    marginTop: -12,
    marginBottom: 16,
  },
  footer: { marginTop: 8, gap: 12 },
  primary: {
    backgroundColor: colors.wine,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryText: { fontFamily: "Inter_700Bold", fontSize: 15, color: "#FFFFFF" },
  secondary: {
    borderWidth: 1.5,
    borderColor: colors.wine,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
  },
  secondaryText: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.wine },
});