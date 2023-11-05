import supabase from "./supabase";

export async function changeBalance({ balance }) {
  const { data, error } = await supabase.auth.updateUser({
    data: { balance: balance },
  });
  if(error) throw new error(error.message)

  return data
}
