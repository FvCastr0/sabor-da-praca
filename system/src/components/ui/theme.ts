import { PT_Serif, Poppins, Raleway } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export const PTSerif = PT_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export const colors = {
  primary: "#C02A28",
  secondary: "#EC6B0E",
  terciary: "#3E0C0F",
  black: "#0F0F0F",
  white: "#FAF7F7"
};
