import { useQuery } from "@tanstack/react-query";
import { fetchCurrenciesList } from "../../services/apiStock";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useCurrencies() {
  const [param] = useSearchParams();
  let defCurrency = param.get("defCurrency");
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => fetchCurrenciesList(defCurrency),
    queryKey: ["currencies"],
  });
  useEffect(
    function () {
      refetch();
    },
    [defCurrency, refetch]
  );

  return { data, isLoading };
}
