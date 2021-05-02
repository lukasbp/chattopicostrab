import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${(props) => props.theme.main};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: black;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.Button`
  color: black;
`;

export const TextInput = styled.TextInput`
  color: black;
`;