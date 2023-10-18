import { useQuery } from "@tanstack/react-query";
import { fetchCurrencyDetails } from "../../services/apiStock";

export function useCurrencyDetails(defCurrency, days, currency) {
  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryFn: () => fetchCurrencyDetails(defCurrency, days, currency),
    queryKey: ["currencyDetails"],
  });
  
  console.log(data)

  return {data, isLoading, refetch, isRefetching}
}
