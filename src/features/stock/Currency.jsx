import { useParams } from "react-router-dom"

function Currency() {
    const {currencyID} = useParams()
    return (
        <div>
            {currencyID}
        </div>
    )
}

export default Currency
