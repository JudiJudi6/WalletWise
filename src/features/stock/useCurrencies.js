import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "../../services/apiStock";

export function useCurrencies() {
  const { data, isLoading } = useQuery({
    queryFn: fetchCurrencies,
    queryKey: ["currencies"],
  });

  return { data, isLoading };
}
