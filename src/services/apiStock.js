const API_HOST = "https://api.frankfurter.app";
import { subDays, format } from "date-fns";

export async function fetchCurrenciesList(defCurrency) {
  const today = new Date();
  const lastResearch = format(subDays(today, 4), "yyyy-MM-dd");

  const res = await fetch(`${API_HOST}/${lastResearch}..?from=${defCurrency}`);
  const data = await res.json();

  console.log(data)

  const dates = Object.keys(data?.rates);
  const secondLastKey = dates[dates.length - 2];
  const todayKey = dates[dates.length - 1];

  return { data, secondLastKey, todayKey };
}

export async function fetchAllCurrenciesName() {
  const res = await fetch(`${API_HOST}/currencies`);
  const data = await res.json();

  return data;
}

export async function fetchCurrencyDetails(defCurrency, days, currency) {
  const today = new Date();
  let range;
  if (days === "all") {
    range = "1999-01-04";
  } else {
    range = format(subDays(today, days), "yyyy-MM-dd");
  }
  // console.log(range, defCurrency, currency);
  const res = await fetch(
    `${API_HOST}/${range}..?to=${currency}&from=${defCurrency}`
  );
  const data = await res.json();

  const rates = data.rates;

  return { rates };
}
