import styled from "styled-components";
import Button from "../../ui/Button";
import { useCheckUser } from "../../hooks/useCheckUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useUpdateNotifications } from "../../hooks/useUpdateNotifications";

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

const StyledSpan = styled.span`
  color: var(--color-main);
`;

function AcceptTransaction({
  setAcceptModal,
  amount,
  message,
  selectedFriend,
  defCurrency,
}) {
  const { data, check, isLoading: isLoadingUser } = useCheckUser();
  const { isLoading, updateNotifications } = useUpdateNotifications();

  useEffect(
    function () {
      check(selectedFriend);
    },
    [check, selectedFriend]
  );

  async function send() {
    const notification = { amount: "69" };

    if (!isLoadingUser && data) {
      console.log(data);
      updateNotifications({userID: data.userID, notification});
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
          <p>{message}</p>
        </div>
        <div>
          <Button variation="danger" onClick={() => setAcceptModal(false)}>
            Decline
          </Button>
          <Button onClick={send} disabled={isLoadingUser}>
            Accept
          </Button>
        </div>
      </StyledModal>
    </Overlay>
  );
}

export default AcceptTransaction;
