import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import BuyModal from "./BuyModal";

function BuyButton({ name, curID, defCur, price }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="buy">
          <Button size="small">Buy</Button>
        </Modal.Open>
        <Modal.Window name="buy">
          <BuyModal name={name} curID={curID} defCur={defCur} price={price} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default BuyButton;
