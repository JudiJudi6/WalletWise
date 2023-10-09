import { useQuery } from "@tanstack/react-query";
import { fetchAllCurrenciesName } from "../../services/apiStock";

export function useCurrenciesNames(){
    const {data, isLoading} = useQuery({
        queryFn: fetchAllCurrenciesName,
        queryKey: ['currenciesNames']
    })

    return {data, isLoading}
}