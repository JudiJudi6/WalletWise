import supabase from "./supabase";

export async function signUp({
  email,
  password,
  fullName,
  nickName,
  birthDate,
  pesel,
}) {
  let userID, nickNames;
  const { data: user, error: errorUser } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        pesel,
        birthDate,
        avatar: "",
        friends: [],
        balance: 50,
      },
    },
  });

  if (errorUser) throw new Error(errorUser.message);

  userID = user.user.id;

  if (!errorUser) {
    const { data: nickNamesApi, error: errorNickNames } = await supabase
      .from("nickNames")
      .insert([{ userID, nickName }])
      .select();

    if (errorNickNames) throw new Error(errorNickNames.message);
    nickNames = nickNamesApi;
  }

  return { user: user.user, nickNames };
}

export async function login({ password, email }) {
  let nickName;
  let { data: user, error: errorUser } = await supabase.auth.signInWithPassword(
    {
      email,
      password,
    }
  );
  if (errorUser) throw new Error(errorUser.message);

  if (!errorUser) {
    let { data: nickNameApi, error } = await supabase
      .from("nickNames")
      .select("*")
      .eq("userID", user.user.id);

    if (error) throw new Error(error.message);
    nickName = nickNameApi.at(0).nickName;
  }

  return { user: user.user, nickName };
}

export async function getCurrentUser() {
  let nickName;
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) throw new Error(errorUser.message);

  if (!errorUser) {
    let { data: nickNameApi, error } = await supabase
      .from("nickNames")
      .select("*")
      .eq("userID", user.user.id);

    if (error) throw new Error(error.message);
    nickName = nickNameApi?.at(0)?.nickName;
  }

  return { user: user.user, nickName };
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getUsersNickNames(nick) {
  let { data, error } = await supabase
    .from("nickNames")
    .select("*")
    .eq("nickName", nick);

  if (error) throw error.message;

  return data;
}
