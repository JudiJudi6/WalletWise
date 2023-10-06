import { useQueryClient } from "@tanstack/react-query"
import { formatCurrency } from "../utils/helpers"

function HeaderAccountBalane() {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['user']).user.user_metadata

    return <p>Balance: {formatCurrency(user.balance)}</p>
}

export default HeaderAccountBalane
