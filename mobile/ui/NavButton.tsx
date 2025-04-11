import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { theme } from "../assets/theme";

interface buttonProps {
  text: string;
}

export function NavButton(props: buttonProps) {
  return (
    <View>
      <StyledButton>
        <Text
          style={{
            fontFamily: theme.fonts.sans.raleway,
            color: theme.colors.white,
            fontSize: 20
          }}
        >
          {props.text}
        </Text>
      </StyledButton>
    </View>
  );
}

const StyledButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.primary};
  border-radius: 6px;
  padding: 5px 10px;
  margin: 0 5px;
`;
