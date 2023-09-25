import styled, { css } from "styled-components";
import { TbBrandCashapp } from "react-icons/tb";
import { useUserWidth } from "../hooks/useUserWidth";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  height: 4.5rem;
  background-color: var(--color-black-200);
  text-transform: uppercase;
  letter-spacing: 1px;

  ${(props) =>
    props.width > 992 || props.width < 567
      ? css`
          justify-content: flex-start;
          padding-left: 1rem;
          width: 190px;
          border-radius: 8px;
        `
      : css`
          justify-content: center;
          width: 4.5rem;
          border-radius: 50%;
        `}
`;

const Icon = styled(TbBrandCashapp)`
  color: var(--color-main);
  font-size: 2.4rem;
`;

const Purple = styled.span`
  color: var(--color-main);
`;

function Logo() {
  const userWidth = useUserWidth();

  return (
    <StyledLogo width={userWidth}>
      <Icon />
      {(userWidth > 992 || userWidth < 567) && (
        <span>
          wallet<Purple>Wise</Purple>
        </span>
      )}
    </StyledLogo>
  );
}

export default Logo;
