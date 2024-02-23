import styled from "styled-components";
import { useUserNotifications } from "../../hooks/useUserNotifications";
import { useUser } from "../autentication/useUser";
import Modal from "./../../ui/Modal";
import { IoIosNotifications } from "react-icons/io";
import Button from "../../ui/Button";
import { useChangeBalance } from "../../hooks/useChangeBalance";
import { useUserConfirmTransaction } from "../../hooks/useUserConfirmTransaction";
import { useEffect, useState } from "react";

const NotifyButton = styled.button`
  position: relative;
  background-color: var(--color-black-200);
  font-size: 18px;
  padding: 8px;
  border-radius: 9999px;
  transition: scale 0.2s;

  &:hover {
    scale: 1.1;
    background-color: var(--color-black-100);
  }
`;

const StyledNotifications = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 8px 5px;
  border-radius: 999px;
  font-size: 12px;
  display: block;
  background-color: var(--color-error);
`;

const Notify = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  /* align-items: end; */
  flex-direction: column;
  gap: 10px;
  margin: 1rem 0;

  @media (min-width: 500px) {
    width: 500px;
    padding: 2.2rem;
  }

  &:hover {
    background-color: var(--color-black-100);
  }
`;

const NotifyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;

  @media (min-width: 600px) {
    font-size: 14px;
  }

  @media (min-width: 900px) {
    font-size: 16px;
  }
`;

const Color = styled.span`
  color: var(--color-main);
`;

const Message = styled.p`
  display: block;
  max-height: 200px;
  overflow-y: auto;
  font-size: 10px;
  margin: 12px 0;

  @media (min-width: 600px) {
    font-size: 14px;
  }
  @media (min-width: 900px) {
    font-size: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const Amount = styled.span`
  font-size: 1.4em;
`;

function Notifications() {
  const { user } = useUser();
  const { data } = useUserNotifications(user.user.id);
  const [refreshKey, setRefreshKey] = useState(0); 
  const { changeBalance, isLoading: isLoadingBalance } = useChangeBalance();
  const { confirmNotification } = useUserConfirmTransaction();
  console.log(data?.at(0)?.notifications);

  function onClick(i) {
    const notify = data?.at(0)?.notifications.at(i);
    changeBalance({ amount: notify.amount, cur: notify.defCurrency });
    confirmNotification({ userID: user.user.id, index: i });
    setRefreshKey((prevKey) => prevKey + 1);
  }

  return (
    <Modal key={refreshKey}>
      <Modal.Open>
        <NotifyButton>
          <IoIosNotifications />
          {data?.at(0)?.notifications?.length > 0 && (
            <StyledNotifications>
              {data?.at(0)?.notifications?.length}
            </StyledNotifications>
          )}
        </NotifyButton>
      </Modal.Open>
      <Modal.Window>
        <div>
          {data?.at(0)?.notifications?.length > 0 ? (
            data?.at(0)?.notifications?.map((item, i) => (
              <Notify key={i}>
                <NotifyHeader>
                  <p>
                    <Color>{item.from}</Color> send you:{" "}
                  </p>
                  <Amount>
                    <Color>
                      {item.amount} {item.defCurrency}
                    </Color>{" "}
                  </Amount>
                </NotifyHeader>
                <Message>{item.message}</Message>
                <Container>
                  <Button
                    size="verysmall"
                    onClick={() => onClick(i)}
                    // disabled={isSuccess}
                  >
                    Confirm
                  </Button>
                </Container>
              </Notify>
            ))
          ) : (
            <Notify>
              <NotifyHeader>
                <p>You don&apos;t have any notifications :(</p>
              </NotifyHeader>
            </Notify>
          )}
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default Notifications;
