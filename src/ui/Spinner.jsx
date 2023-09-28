import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";

const FullArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-200);
`;

function Spinner() {
  return (
    <FullArea>
      <ScaleLoader color="var(--color-main)"/>
    </FullArea>
  );
}

export default Spinner;
