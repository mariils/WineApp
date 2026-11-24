import type { Wine } from "../types/wine";

export type Answers = Record<string, string>;

export type Question = {
  id: "type" | "body" | "budget" | "occasion" | "country";
  title: string;
  options: string[];
};

export const questions: Question[] = [
  {
    id: "type",
    title: "Qual tipo de vinho você mais gosta?",
    options: ["Tinto", "Branco", "Rosé", "Espumante"],
  },
  {
    id: "body",
    title: "Como você prefere o corpo do vinho?",
    options: ["Leve", "Médio", "Encorpado"],
  },
  {
    id: "budget",
    title: "Quanto costuma gastar por garrafa?",
    options: ["Até R$ 100", "R$ 100 a R$ 150", "Acima de R$ 150"],
  },
  {
    id: "occasion",
    title: "Para qual momento é o vinho?",
    options: ["Dia a dia", "Jantar a dois", "Churrasco", "Presentear"],
  },
  {
    id: "country",
    title: "Tem preferência de origem?",
    options: ["Brasil", "Argentina", "Portugal", "Tanto faz"],
  },
];

const budgetRanges: Record<string, [number, number]> = {
  "Até R$ 100": [0, 100],
  "R$ 100 a R$ 150": [100, 150],
  "Acima de R$ 150": [150, Infinity],
};

export function recommend(wines: Wine[], answers: Answers): Wine[] {
  const range = budgetRanges[answers.budget];

  return wines
    .map((wine) => {
      let score = 0;
      if (wine.type === answers.type) score += 4;
      if (wine.body === answers.body) score += 2;
      if (range && wine.price > range[0] && wine.price <= range[1]) score += 2;
      if (wine.occasion === answers.occasion) score += 2;
      if (wine.country === answers.country) score += 1;
      return { wine, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.wine);
}