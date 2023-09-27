import supabase from "./supabase";

export async function signUp({ fullName, email, password, nickName, pesel }) {
  let userData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    const userID = data.user.id;

    const { data: userTableData, error: userTableError } = await supabase
      .from("profileData")
      .insert([{ userID, fullName, email, nickName, pesel }]);

    if (userTableError) throw new Error(error.message);
    userData = userTableData;
  } else throw new Error(error.message);
  
  return { data, userData };
}

export async function signIn({ password, email }) {
  const { data, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}
