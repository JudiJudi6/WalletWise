import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-white-100);
    background-color: var(--color-main);

    &:hover {
      background-color: var(--color-purple);
    }

    &:focus {
      outline: none;
      background-color: var(--color-purple);
      scale: 1.05;
      transition: scale 0.3s;
    }
  `,

  danger: css`
    color: var(--color-error);
    background-color: transparent;
    border: 2px solid var(--color-error);

    &:hover {
      background-color: var(--color-black-200);
    }

    &:focus {
      outline: none;
      background-color: var(--color-black-200);
      scale: 1.05;
      transition: scale 0.3s;
    }
  `,
};

const Button = styled(motion.button)`
  border: none;
  border-radius: 100px;
  width: 50%;
  align-self: center;
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]} /* &:focus {
    outline: none;
    background-color: var(--color-purple);
    scale: 1.05;
    transition: scale 0.3s;
  } */
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
