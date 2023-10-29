import { offers } from "../app/data";

export type Offer = (typeof offers)[0];

export type Product = Offer & {
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
