export type Wine = {
  id: string;
  name: string;
  grape: string;
  region: string;
  country: "Brasil" | "Argentina" | "Portugal";
  type: "Tinto" | "Branco" | "Rosé" | "Espumante";
  body: "Leve" | "Médio" | "Encorpado";
  occasion: "Dia a dia" | "Jantar a dois" | "Churrasco" | "Presentear";
  rating: number;
  reviews: number;
  price: number;
  image?: string;
};