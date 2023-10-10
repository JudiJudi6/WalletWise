import styled from "styled-components";
import { useUser } from "./useUser";
import { motion } from "framer-motion";
import Modal from "../../ui/Modal";
import ModalEditAvatar from "../../ui/ModalEditAvatar";

const StyledEditAvatar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
`;

const StyledImg = styled(motion.img)`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const EditButton = styled(motion.button)`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

function EditAvatar() {
  const { user } = useUser();

  return (
    <StyledEditAvatar>
      <span>Edit your avatar:</span>
      <Modal>
        <Modal.Open opens="editAvatar">
          <EditButton whileHover={{ scale: 1.1 }} whileFocus={{ scale: 1.1 }}>
            <StyledImg
              src={user.user.user_metadata.avatar}
              alt={user.nickName}
            />
          </EditButton>
        </Modal.Open>
        <Modal.Window name="editAvatar">
          <ModalEditAvatar />
        </Modal.Window>
      </Modal>
    </StyledEditAvatar>
  );
}

export default EditAvatar;
