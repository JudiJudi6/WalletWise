import supabase from "./supabase";

export async function signUp({
  email,
  password,
  fullName,
  nickName,
  birthDate,
  pesel,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        pesel,
        nickName,
        birthDate,
        avatar: "",
        friends: [],
        balance: 50,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data.user;
}

export async function login({ password, email }) {
  let { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return user.user;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) throw new Error(errorUser.message);

  return user.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getUsersNickNames() {
  let { data: nickNames, error } = await supabase
    .from("profileData")
    .select("nickName");

  if (error) throw new Error(error.message);

  return nickNames;
}
