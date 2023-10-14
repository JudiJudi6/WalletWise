const API_HOST = "https://api.frankfurter.app";
import { subDays, format } from "date-fns";

export async function fetchCurrenciesList(defCurrency) {
  const today = new Date();
  const lastResearch = format(subDays(today, 3), "yyyy-MM-dd");
  //   console.log(lastResearch);
  const res = await fetch(`${API_HOST}/${lastResearch}..?from=${defCurrency}`);
  const data = await res.json();

  const dates = Object.keys(data?.rates);
  const secondLastKey = dates[dates.length - 2];
  const todayKey = dates[dates.length - 1];
  //   console.log(secondLastKey);
  //   console.log(data);

  return { data, secondLastKey, todayKey };
}

export async function fetchAllCurrenciesName() {
  const res = await fetch(`${API_HOST}/currencies`);
  const data = await res.json();

  return data;
}
