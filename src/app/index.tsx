import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "./constants/colors";

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  

  return (
    <LinearGradient
      colors={[colors.wineLight, colors.wine, colors.wineDark]}
      style={styles.container}
    >
      <View style={[styles.top, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.eyebrow}>SUA PRÓXIMA DESCOBERTA</Text>
        <Image
          source={require("../../assets/images/logocat.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Seu guia de vinhos</Text>
        <Text style={styles.subtitle}>
          Descubra rótulos, harmonizações e degustações para cada momento.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => console.log("Explorar vinhos")}
        >
          <Text style={styles.buttonText}>Explorar vinhos</Text>
        </Pressable>

        <Text style={styles.login}>
          Já tem uma conta?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => router.replace("../inicio")}
          >
            Entrar
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { flex: 1, alignItems: "center" },
  eyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.cream,
  },
  logo: { width: 200, height: 400, marginTop: 70 },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 25,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.creamDark,
    marginBottom: 24,
  },
  title: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 30,
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.wine,
    borderRadius: 999,
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    shadowColor: colors.wine,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#FFFFFF",
  },
  login: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 18,
  },
  loginLink: { fontFamily: "Inter_700Bold", color: colors.wine },
});