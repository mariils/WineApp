import type { Wine } from "../types/wine";

export const wines: Wine[] = [
  { id: "1", name: "Alma Serena", grape: "Malbec", region: "Mendoza", country: "Argentina", type: "Tinto", body: "Encorpado", occasion: "Jantar a dois", rating: 4.9, reviews: 20, price: 149 },
  { id: "2", name: "Quinta do Vale", grape: "Touriga", region: "Douro", country: "Portugal", type: "Tinto", body: "Encorpado", occasion: "Presentear", rating: 4.8, reviews: 27, price: 189 },
  { id: "3", name: "Canto da Lua", grape: "Pinot Noir", region: "Serra Gaúcha", country: "Brasil", type: "Tinto", body: "Leve", occasion: "Jantar a dois", rating: 4.7, reviews: 34, price: 119 },
  { id: "4", name: "Brisa Antiga", grape: "Cabernet", region: "Vale dos Vinhedos", country: "Brasil", type: "Tinto", body: "Encorpado", occasion: "Churrasco", rating: 4.6, reviews: 41, price: 136 },
  { id: "5", name: "Flor de Sal", grape: "Chardonnay", region: "Serra Gaúcha", country: "Brasil", type: "Branco", body: "Médio", occasion: "Dia a dia", rating: 4.5, reviews: 18, price: 98 },
  { id: "6", name: "Aurora Rosa", grape: "Syrah", region: "Vale do São Francisco", country: "Brasil", type: "Rosé", body: "Leve", occasion: "Dia a dia", rating: 4.4, reviews: 12, price: 87 },
  { id: "7", name: "Bolhas de Ouro", grape: "Chardonnay", region: "Serra Gaúcha", country: "Brasil", type: "Espumante", body: "Leve", occasion: "Presentear", rating: 4.6, reviews: 25, price: 129 },
];