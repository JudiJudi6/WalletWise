import supabase from "./supabase";

export async function changeBalance(balance) {
  console.log(balance);
  const { data, error } = await supabase.auth.updateUser({
    data: { balance: balance },
  });
  if (error) throw new error(error.message);

  return data;
}

export async function addHistory(history){
  const { data, error } = await supabase.auth.updateUser({
    data: { history: history },
  });
  if (error) throw new error(error.message);

  return data;
}