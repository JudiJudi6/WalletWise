import { motion } from "framer-motion";
import styled from "styled-components";
import { useUserWidth } from "../../hooks/useUserWidth";

const StyledSignUpButton = styled(motion.button)`
  color: var(--color-main);
  background-color: transparent;
  text-decoration: underline var(--color-main);
  letter-spacing: 1px;
  text-underline-offset: 5px;

  &:focus {
    outline: none;
  }
`;

const SignUpButtonArea = styled.div`
  /* width: 100%; */
  z-index: 1;
  margin-top: ${(props) => (props.width < 992 ? "10px" : "35px")};
`;

function SignUpButton({ onRegisterButton, showRegister }) {
  const userWidth = useUserWidth();

  const p1Variants = {
    hidden: {
      y: -20,
      opacity: 0,
      display: "none",
    },
    visible: {
      y: 0,
      opacity: 1,
      display: "block",
    },
  };

  const p2Variants = {
    hidden: {
      y: 20,
      opacity: 0,
      display: "none",
    },
    visible: {
      y: 0,
      opacity: 1,
      display: "block",
    },
  };

  return (
    <SignUpButtonArea width={userWidth}>
      <StyledSignUpButton
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05 }}
        onClick={onRegisterButton}
      >
        <motion.div
          variants={p1Variants}
          initial="hidden"
          exit="hidden"
          animate={showRegister ? "visible" : "hidden"}
        >
          <p>Already have account?</p>
        </motion.div>

        <motion.div
          variants={p2Variants}
          initial="hidden"
          exit="hidden"
          animate={!showRegister ? "visible" : "hidden"}
        >
          <p>Don&apos;t have account?</p>
        </motion.div>
      </StyledSignUpButton>
    </SignUpButtonArea>
  );
}

export default SignUpButton;
