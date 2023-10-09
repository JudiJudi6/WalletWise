import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/autentication/useUser";

const StyledButton = styled(motion.button)`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledImg = styled(motion.img)`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

function HeaderAccountButton() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <StyledButton
      whileHover={{ scale: 1.1 }}
      whileFocus={{ scale: 1.1 }}
      onClick={() => navigate("/account")}
    >
      <StyledImg src={user.user.user_metadata.avatar} alt={user.nickName} />
    </StyledButton>
  );
}

export default HeaderAccountButton;
