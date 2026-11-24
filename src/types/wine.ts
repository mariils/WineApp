export type Wine = {
  id: string;
  name: string;
  grape: string;
  region: string;
  type: "Tinto" | "Branco" | "Rosé" | "Espumante";
  rating: number;
  reviews: number;
  price: number;
  image?: string;
};