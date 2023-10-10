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

  // if(!isLoading){

  //   const dates = Object.keys(data?.rates)
  //   const secondLastKey = dates[dates.length - 2] 
  //   console.log(secondLastKey) 
  // }

  
  return { data, isLoading };
}
