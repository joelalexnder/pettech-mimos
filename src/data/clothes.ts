export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  externalId: string;
}

export const clothingItems: ClothingItem[] = [
  {
    id: "1",
    name: "Adidog Buzo Azul",
    description: "Buzo cómodo y moderno para mascotas",
    imageUrl:
      "https://i.ibb.co/Q3T5Srq9/Adidog-Buzo-Azul-para-Mascotas-Talla-4-1024x1024.png",
    externalId: "ropa-perro-1",
  },
  {
    id: "2",
    name: "Casarone",
    description: "Ropa elegante para mascotas",
    imageUrl: "https://i.ibb.co/ksK23B86/casarone.jpg",
    externalId: "ropa-perro-2",
  },
  {
    id: "3",
    name: "Charo",
    description: "Diseño cómodo para uso diario",
    imageUrl: "https://i.ibb.co/Lz2p76Dm/chora.jpg",
    externalId: "ropa-perro-3",
  },
  {
    id: "4",
    name: "Ropa Casual",
    description: "Ideal para paseos y actividades",
    imageUrl: "https://i.ibb.co/Xr3YgXbj/ropa.jpg",
    externalId: "ropa-perro-4",
  },
  {
    id: "5",
    name: "Pobla",
    description: "Abrigo suave para clima frío",
    imageUrl: "https://i.ibb.co/hxNc3yGz/pobla.jpg",
    externalId: "ropa-perro-5",
  },
  {
    id: "6",
    name: "Poaz",
    description: "Prenda ligera y cómoda",
    imageUrl: "https://i.ibb.co/G44M16mC/poaz.jpg",
    externalId: "ropa-perro-6",
  },
  {
    id: "7",
    name: "Poama L",
    description: "Ropa moderna para mascotas",
    imageUrl: "https://i.ibb.co/bRLSTYP1/poama-L.jpg",
    externalId: "ropa-perro-7",
  },
   {
    id: "8",
    name: "casualito",
    description: "Ropa comoda para mascotas",
    imageUrl: "https://i.ibb.co/rfHNg8Rr/charo.jpg",
    externalId: "ropa-perrito-2",
  },
];