import styled from "styled-components";
import { BuyP, SellP } from "./HistoryTransfer";
import { Message } from "../dashboard/AcceptTransaction";

const StyledHistoryItemDetail = styled.div`
  width: 100%;
  padding: 5px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

function HistoryTransferDetails({ item }) {
  return (
    <StyledHistoryItemDetail>
      <MainDiv>
        <div>
          <StyledHeader>
            <p>
              You{" "}
              {item.type === "send" ? (
                <SellP>{item.type}</SellP>
              ) : (
                <BuyP>{item.type}</BuyP>
              )}{" "}
              {item.amount} {item.defCur} {item.type === "send" ? "to" : "from"}{" "}
              <span style={{ color: "var(--color-main)" }}>{item.to}</span> at{" "}
              {item.date}
            </p>
          </StyledHeader>
          <p>With message:</p>
          <Message>{item.message}</Message>
        </div>
      </MainDiv>
    </StyledHistoryItemDetail>
  );
}

export default HistoryTransferDetails;
