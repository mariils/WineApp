import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";
import { colors } from "../constants/colors";

type Mode = "login" | "cadastro";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  phone: "",
  birth: "",
  address: "",
  cpf: "",
};
type Form = typeof emptyForm;

function Field(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      {...props}
      style={[styles.input, props.style]}
    />
  );
}

export default function Auth() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useApp();
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState<Form>(emptyForm);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  function update(field: keyof Form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function changeMode(next: Mode) {
    setMode(next);
    setError("");
  }

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }

  function submit() {
    const email = form.email.trim();

    if (!isLogin && !form.name.trim()) {
      setError("Digite seu nome completo.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Digite um e-mail válido.");
      return;
    }
    if (isLogin && !form.password) {
      setError("Digite sua senha.");
      return;
    }
    if (!isLogin && form.password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (!isLogin && form.password !== form.confirm) {
      setError("As senhas não são iguais.");
      return;
    }

    signIn({
      name: isLogin ? email.split("@")[0] : form.name.trim(),
      email,
    });
    router.replace("/inicio");
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable style={styles.back} onPress={goBack}>
            <Ionicons name="arrow-back" size={20} color={colors.wine} />
          </Pressable>
          <Text style={styles.topTitle}>Bem-vindo à NonaVida</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.intro}>
          <Image
            source={require("../../assets/images/logocat.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.introTexts}>
            <Text style={styles.eyebrow}>ACESSO À SUA ADEGA</Text>
            <Text style={styles.title}>
              {isLogin ? "Que bom ter você de volta." : "Vamos criar seu perfil."}
            </Text>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.segment}>
            {(["login", "cadastro"] as Mode[]).map((m) => {
              const active = mode === m;
              return (
                <Pressable
                  key={m}
                  style={[styles.segmentItem, active && styles.segmentActive]}
                  onPress={() => changeMode(m)}
                >
                  <Text
                    style={[styles.segmentText, active && styles.segmentTextActive]}
                  >
                    {m === "login" ? "Login" : "Cadastro"}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {!isLogin && (
            <Field
              placeholder="Nome completo"
              value={form.name}
              onChangeText={(v) => update("name", v)}
              autoCapitalize="words"
            />
          )}

          <Field
            placeholder="E-mail"
            value={form.email}
            onChangeText={(v) => update("email", v)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Field
            placeholder="Senha"
            value={form.password}
            onChangeText={(v) => update("password", v)}
            secureTextEntry
            autoCapitalize="none"
          />

          {!isLogin && (
            <>
              <Field
                placeholder="Confirmar senha"
                value={form.confirm}
                onChangeText={(v) => update("confirm", v)}
                secureTextEntry
                autoCapitalize="none"
              />
              <View style={styles.row}>
                <Field
                  style={styles.half}
                  placeholder="Telefone"
                  value={form.phone}
                  onChangeText={(v) => update("phone", v)}
                  keyboardType="phone-pad"
                />
                <Field
                  style={styles.half}
                  placeholder="Data de nascimento"
                  value={form.birth}
                  onChangeText={(v) => update("birth", v)}
                  keyboardType="numeric"
                />
              </View>
              <Field
                placeholder="Endereço"
                value={form.address}
                onChangeText={(v) => update("address", v)}
              />
              <Field
                placeholder="CPF"
                value={form.cpf}
                onChangeText={(v) => update("cpf", v)}
                keyboardType="numeric"
              />
            </>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.submit} onPress={submit}>
            <Text style={styles.submitText}>Continuar</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.wine} />
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ou continue com</Text>
            <View style={styles.line} />
          </View>

          <Pressable style={styles.google} onPress={() => console.log("Google")}>
            <View style={styles.googleBadge}>
              <Text style={styles.googleLetter}>G</Text>
            </View>
            <Text style={styles.googleText}>Google</Text>
          </Pressable>

          <Text style={styles.team} onPress={() => console.log("Equipe")}>
            Acesso da equipe NonaVida
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.wine,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  spacer: { width: 36 },
  topTitle: { fontFamily: "Inter_700Bold", fontSize: 13, color: colors.text },
  intro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
    marginBottom: 18,
  },
  logo: { width: 56, height: 56 },
  introTexts: { flex: 1 },
  eyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.wineLight,
  },
  title: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 24,
    color: colors.text,
    marginTop: 4,
  },
  panel: {
    backgroundColor: colors.wine,
    borderRadius: 28,
    padding: 16,
    gap: 10,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  segmentActive: { backgroundColor: "#FFFFFF" },
  segmentText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.cream,
  },
  segmentTextActive: { color: colors.wine },
  input: {
    backgroundColor: colors.creamDark,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.text,
  },
  row: { flexDirection: "row", gap: 10 },
  half: { flex: 1 },
  error: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#FFD6DC",
    textAlign: "center",
  },
  submit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 16,
    marginTop: 4,
  },
  submitText: { fontFamily: "Inter_700Bold", fontSize: 14, color: colors.wine },
  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  line: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.2)" },
  dividerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.cream,
  },
  google: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    paddingVertical: 14,
  },
  googleBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  googleLetter: { fontFamily: "Inter_700Bold", fontSize: 12, color: "#4285F4" },
  googleText: { fontFamily: "Inter_700Bold", fontSize: 14, color: "#FFFFFF" },
  team: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: colors.cream,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 4,
  },
});