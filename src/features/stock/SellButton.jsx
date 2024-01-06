import Button from "../../ui/Button"
import Modal from "../../ui/Modal"

function SellButton() {
    return (
        <div>
        <Modal>
          <Modal.Open opens="deposit">
            <Button size="small">Sell</Button>
          </Modal.Open>
          <Modal.Window name="deposit"><div>Sell</div></Modal.Window>
        </Modal>
      </div>
    )
}

export default SellButton
