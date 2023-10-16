import { IoIosStats } from "react-icons/io";
import Modal from "../../ui/Modal";
import NavButton from "../../ui/NavButton";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BsCash } from "react-icons/bs";
import { useUserWidth } from "../../hooks/useUserWidth";
import DepositWindow from "./DepositWindow";

const DepositButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-200);
  padding: 1rem 1.4rem;
  border-radius: 8px;
  gap: 1rem;
  font-size: 1.4rem;
  margin-right: 1rem;
`;

function Deposit() {
  const userWidth = useUserWidth();

  return (
    <div>
      <Modal>
        <Modal.Open opens="deposit">
          {userWidth > 400 ? (
            <DepositButton
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--color-black-100)",
              }}
            >
              <BsCash /> Deposit
            </DepositButton>
          ) : (
            <DepositButton
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--color-black-100)",
              }}
            >
              <BsCash />
            </DepositButton>
          )}
        </Modal.Open>
        <Modal.Window name="deposit">
          <DepositWindow />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Deposit;
