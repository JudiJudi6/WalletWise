import { useQueryClient } from "@tanstack/react-query"
import { formatCurrency } from "../utils/helpers"

function HeaderAccountBalane() {
    const queryClient = useQueryClient()
    const data = queryClient.getQueryData(['data'])
    const profileData = data.profileData
    console.log(profileData)

    return <p>Balance: {formatCurrency(profileData.money)}</p>
}

export default HeaderAccountBalane
