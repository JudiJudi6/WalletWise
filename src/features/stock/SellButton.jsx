import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SellModal from "./SellModal";

function SellButton({ name, curID, defCur, price }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="sell">
          <Button size="small">Sell</Button>
        </Modal.Open>
        <Modal.Window name="sell">
          <SellModal name={name} curID={curID} defCur={defCur} price={price} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default SellButton;
