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

export async function login({ password, email }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log(session)

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
