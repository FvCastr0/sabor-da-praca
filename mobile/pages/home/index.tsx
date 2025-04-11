import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavButton } from "../../ui/NavButton";
import { FlexView, Title } from "./homeStyles";

export function HomeScreen() {
  return (
    <SafeAreaView>
      <FlexView
        style={{
          marginTop: 18,
          marginHorizontal: 25
        }}
      >
        <Title>Vendas</Title>
        <FlexView>
          <NavButton text="Dia" />
          <NavButton text="Mês" />
        </FlexView>
      </FlexView>
    </SafeAreaView>
  );
}
