import { useQuery } from "@tanstack/react-query";
import { fetchCurrencyDetails } from "../../services/apiStock";

export function useCurrencyDetails(defCurrency, days, currency) {
  console.log(days)
  const {data, isLoading, refetch} = useQuery({
    queryFn: () => fetchCurrencyDetails(defCurrency, days, currency),
    queryKey: ["currencyDetails"],
  });

  return {data, isLoading, refetch}
}
