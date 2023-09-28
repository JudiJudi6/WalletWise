import { TbBrandCashapp } from "react-icons/tb";
import styled, { css } from "styled-components";
import { useUserWidth } from "../hooks/useUserWidth";
import Logo from "../ui/Logo";
import LoginForm from "../features/autentication/LoginForm";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/autentication/useUser";
import SignUpButton from "../features/autentication/SignUpButton";
import SignUpForm from "../features/autentication/SignUpForm";

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: var(--color-white-100);
  background-color: var(--color-black-300);
  overflow: scroll;

  ${(props) =>
    props.width < 567
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
        `}
`;

const MainBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-black-200);
  width: 70%;
  height: 80%;
  box-shadow: 8px 8px 25px 0px black;
  padding: 4rem 1rem;
  overflow: hidden;

  ${(props) =>
    props.width > 992 &&
    css`
      flex-direction: row;
      justify-content: flex-start;
      padding-left: 6rem;
    `}
`;

const HelperDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 50%;
`;

const Icon = styled(TbBrandCashapp)`
  color: var(--color-main);
  font-size: 3.8rem;
  align-self: ${(props) => props.align};
`;

const CircleOne = styled(motion.div)`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  z-index: 0;
  cursor: grabbing;
  box-shadow: 1px 1px 5px 0px black;
  background-image: linear-gradient(
    ${(props) => props.deg},
    var(--color-pink),
    var(--color-purple)
  );
`;

const TextContainer = styled.div`
  position: relative;
  padding-right: 3rem;
  margin-top: 4rem;
  z-index: 1;
`;

const ColorText = styled.span`
  font-size: 2.2rem;
  background: linear-gradient(90deg, var(--color-pink), var(--color-purple));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Purple = styled.span`
  color: var(--color-main);
`;

const LogoText = styled.span`
  font-size: 3.8rem;
`;

function Login() {
  const [showRegister, setRegister] = useState(false);
  const userWidth = useUserWidth();
  const ref = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  function handleRegisterButton() {
    setRegister((s) => !s);
  }

  useEffect(() => {
    function chechAuth() {
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    }
    chechAuth();
  }, [isAuthenticated, navigate, user]);

  if (userWidth < 567)
    return (
      <StyledLoginPage>
        <Logo />
        <SignUpForm showRegister={showRegister} />
        <LoginForm showRegister={showRegister} />
        <SignUpButton
          showRegister={showRegister}
          onRegisterButton={handleRegisterButton}
        />
      </StyledLoginPage>
    );

  if (userWidth < 992)
    return (
      <StyledLoginPage>
        <MainBlock>
          <div>
            <Icon />
            <LogoText>
              Wallet<Purple>Wise</Purple>
            </LogoText>
          </div>
          <SignUpForm showRegister={showRegister} />
          <LoginForm showRegister={showRegister} />
            <SignUpButton
              showRegister={showRegister}
              onRegisterButton={handleRegisterButton}
            />
        </MainBlock>
      </StyledLoginPage>
    );

  return (
    <StyledLoginPage width={userWidth}>
      <MainBlock width={userWidth} ref={ref}>
        <CircleOne
          size="50px"
          deg="90deg"
          top="30%"
          left="50%"
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={ref}
          dragSnapToOrigin={true}
        />
        <CircleOne
          size="20px"
          deg="180deg"
          top="15%"
          left="60%"
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={ref}
          dragSnapToOrigin={true}
        />
        <CircleOne
          size="45px"
          deg="180deg"
          top="20%"
          left="70%"
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={ref}
          dragSnapToOrigin={true}
        />
        <CircleOne
          size="60px"
          deg="180deg"
          top="50%"
          left="85%"
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={ref}
          dragSnapToOrigin={true}
        />
        <CircleOne
          size="40px"
          deg="90deg"
          top="70%"
          left="85%"
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={ref}
          dragSnapToOrigin={true}
        />
        <CircleOne
          size="35px"
          deg="180deg"
          top="80%"
          left="70%"
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={ref}
        />
        {/* <CircleOne size="40px" deg="90deg" top="80%" left="80%" /> */}
        <HelperDiv>
          <div>
            <Icon />
            <LogoText>
              Wallet<Purple>Wise</Purple>
            </LogoText>
          </div>
          <TextContainer>
            <ColorText>
              Join us on a journey of hassle-free and efficient banking!
            </ColorText>
          </TextContainer>
          <TextContainer>
            Open an account with us today and enjoy a world of convenience. Make
            seamless online payments, easily convert currencies, and transfer
            money swiftly to other users accounts.{" "}
          </TextContainer>
          <SignUpButton
            showRegister={showRegister}
            onRegisterButton={handleRegisterButton}
          />
        </HelperDiv>
        <SignUpForm showRegister={showRegister} />
        <LoginForm showRegister={showRegister} />
      </MainBlock>
    </StyledLoginPage>
  );
}

export default Login;
