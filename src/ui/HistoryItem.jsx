import styled from "styled-components";
import { formatCurrency } from "../utils/helpers";
import Modal from "./Modal";
import HistoryItemDetails from "./HistoryItemDetails";

const StyledHistoryItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: left;
  background-color: var(--color-black-300);
  border-radius: 8px;
  padding: 25px;

  &:hover {
    background-color: var(--color-black-200);
  }
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
  padding: 2px;
  text-align: center;
  font-size: 10px;
  margin-left: 5px;

  @media (min-width: 400px) {
    font-size: 12px;
  }

  @media (min-width: 600px) {
    font-size: 14px;
  }
`;

function HistoryItem({ item, more }) {
  console.log(item);
  return (
    <Modal>
      <Modal.Open opens="his">
        <StyledHistoryItem>
          <StyledMainImg src={`/${item.cur}.png`} />
          <MainP>
            You{" "}
            {item.type === "sell" ? (
              <SellP>{item.type}</SellP>
            ) : (
              <BuyP>{item.type}</BuyP>
            )}{" "}
            {item.amount} {item.cur} for {formatCurrency(item.price)}{" "}
            {item.defCur}
          </MainP>
        </StyledHistoryItem>
      </Modal.Open>
      <Modal.Window name="his">
        <HistoryItemDetails item={item} more={more} />
      </Modal.Window>
    </Modal>
  );
}

export default HistoryItem;
