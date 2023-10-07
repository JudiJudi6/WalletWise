import styled from "styled-components";

const ColorText = styled.span`
  /* font-size: 2.2rem; */
  font-size: ${props=> props.size};
  background: linear-gradient(90deg, var(--color-pink), var(--color-purple));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export default ColorText;
