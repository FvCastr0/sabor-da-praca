import { Text, View } from "react-native";
import styled from "styled-components";
import { theme } from "../../assets/theme";

export const Title = styled(Text)`
  text-align: left;
  font-family: ${theme.fonts.sans.poppins};
  font-size: 24px;
`;

export const FlexView = styled(View)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
