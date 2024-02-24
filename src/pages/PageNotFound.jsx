import { Link } from "react-router-dom";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainP = styled.p`
  font-size: 80px;
`;

function PageNotFound() {
  return (
    <Center>
      <MainP>404</MainP>
      <p style={{ fontSize: "30px" }}>Page not found</p>
      <p style={{ fontSize: "24px", margin: "10px" }}>
        Let&apos;s back to{" "}
        <Link to="/" style={{ color: "var(--color-main)" }}>
          Home
        </Link>
      </p>
    </Center>
  );
}

export default PageNotFound;
