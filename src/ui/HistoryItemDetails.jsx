import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";
import Button from "./Button";

const StyledHistoryItemDetail = styled.div`
  width: 100%;
  padding: 5px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Cur = styled.p`
  font-size: 20px;
`;

const MainDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  gap: 20px;
`;

function HistoryItemDetails({ item, more = true }) {
  const navigate = useNavigate();
  const itemLink = `/stock/${item.cur}?defCurrency=${item.defCur}`;

  return (
    <StyledHistoryItemDetail>
      <MainDiv>
        <div>
          <StyledHeader>
            <Cur>
              {item.amount} {item.cur}
            </Cur>
            <p>
              {item.type === "buy" ? (
                <span style={{ color: "var(--color-green)" }}>Bought</span>
              ) : (
                <span style={{ color: "var(--color-error)" }}>Sold</span>
              )}
            </p>
          </StyledHeader>
          <p>
            for {formatCurrency(item.price)} {item.defCur}
          </p>
        </div>
        <p>at {item.date}</p>
        <ButtonsContainer>
          <Button size="small" onClick={() => navigate(itemLink)}>
            Show Currency
          </Button>
          {more && (
            <Button size="small" onClick={() => navigate("/stats")}>
              More History
            </Button>
          )}
        </ButtonsContainer>
      </MainDiv>
    </StyledHistoryItemDetail>
  );
}

export default HistoryItemDetails;
