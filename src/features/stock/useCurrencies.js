import { useQuery } from "@tanstack/react-query";
import { fetchCurrenciesList } from "../../services/apiStock";
import { useEffect } from "react";

export function useCurrencies(defCurrency) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => fetchCurrenciesList(defCurrency),
    queryKey: ["currencies"],
  });
  useEffect(function(){
    refetch()
  },[defCurrency, refetch])
  
  return { data, isLoading };
}
