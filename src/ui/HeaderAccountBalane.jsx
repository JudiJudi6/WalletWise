import { useQueryClient } from "@tanstack/react-query"
import { formatCurrency } from "../utils/helpers"

function HeaderAccountBalane() {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['user'])

    return <p>Balance:</p>
}

export default HeaderAccountBalane
