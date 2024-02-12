import styled from "styled-components";
import { formatCurrency } from "../utils/helpers";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StyledHistoryItem = styled(motion(Link))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-black-300);
  border-radius: 8px;
  padding: 25px;
`;

const StyledMainImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const SellP = styled.span`
  color: var(--color-error);
`;

const BuyP = styled.span`
  color: var(--color-green);
`;

const MainP = styled.p`
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-left: 5px;
`;

function HistoryItem({ item }) {
  return (
    <StyledHistoryItem
      to={`/stock/${item?.cur}?defCurrency=${item?.defCur}`}
      whileHover={{ backgroundColor: "var(--color-black-300-hover)" }}
    >
      <StyledMainImg src={`/${item.cur}.png`} />
      <MainP>
        You{" "}
        {item.type === "sell" ? (
          <SellP>{item.type}</SellP>
        ) : (
          <BuyP>{item.type}</BuyP>
        )}{" "}
        {item.amount} for {formatCurrency(item.price)} {item.defCur}
      </MainP>
    </StyledHistoryItem>
  );
}

export default HistoryItem;
