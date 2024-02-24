import styled from "styled-components";
import Button from "../../ui/Button";
import { useCheckUser } from "../../hooks/useCheckUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useUpdateNotifications } from "../../hooks/useUpdateNotifications";
import { useChangeBalance } from "../../hooks/useChangeBalance";
import { formatCurrency } from "../../utils/helpers";
import { useAddOperationsHistory } from "../../hooks/useAddOperationsHistory";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px black;
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  @media (min-width: 500px) {
    width: fit-content;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(2px);
  z-index: 1000;
  transition: all 0.5s;
`;

export const StyledSpan = styled.span`
  color: var(--color-main);
`;

export const Message = styled.p`
  padding: 1rem 0;
  color: #7a7979;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 2px;
  margin-top: 2rem;
`;

function AcceptTransaction({
  setAcceptModal,
  amount,
  message,
  selectedFriend,
  defCurrency,
  user,
  amountOfDef,
  clearForm,
}) {
  const { changeBalance } = useChangeBalance();
  const { data, check, isLoading: isLoadingUser } = useCheckUser();
  const { updateNotifications } = useUpdateNotifications();
  const { changeHistory } = useAddOperationsHistory();
  const today = new Date();

  useEffect(
    function () {
      check(selectedFriend);
    },
    [check, selectedFriend]
  );

  async function send() {
    const notification = { amount, message, defCurrency, from: user.nickName };

    if (amountOfDef - amount < 0) {
      toast.error("You don't have enought money to do this transaction");
      return;
    }

    if (!isLoadingUser && data) {
      changeBalance({ amount: -amount, cur: defCurrency });
      changeHistory({
        type: "send",
        amount: amount,
        date: today.toLocaleDateString(),
        defCur: defCurrency,
        to: selectedFriend,
        message: message,
      });
      updateNotifications({ userID: data.userID, notification });
      clearForm();
      setAcceptModal(false);
    } else {
      setAcceptModal(false);
      toast.error("User with this nick does not exist");
    }
  }

  return (
    <Overlay>
      <StyledModal>
        <div>
          <p>
            You want sent{" "}
            <StyledSpan>
              {amount} {defCurrency}
            </StyledSpan>{" "}
            to <StyledSpan>{selectedFriend}</StyledSpan> with message:{" "}
          </p>
          <Message>{message}</Message>
          {amountOfDef - amount >= 0 ? (
            <p>
              Funds left after transaction:{" "}
              {formatCurrency(amountOfDef - amount)} {defCurrency}
            </p>
          ) : (
            <p>You don&apos;t have enought money to do this transaction</p>
          )}
        </div>
        <ButtonsContainer>
          <Button variation="danger" onClick={() => setAcceptModal(false)}>
            Decline
          </Button>
          <Button
            onClick={send}
            disabled={isLoadingUser || amountOfDef - amount < 0}
          >
            Accept
          </Button>
        </ButtonsContainer>
      </StyledModal>
    </Overlay>
  );
}

export default AcceptTransaction;
