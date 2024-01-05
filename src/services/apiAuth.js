import supabase, { supabaseUrl } from "./supabase";

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
        avatar:
          "https://pdselwjhhojvthszriij.supabase.co/storage/v1/object/sign/avatars/default-user.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2RlZmF1bHQtdXNlci5qcGciLCJpYXQiOjE2OTY3MTMyNzYsImV4cCI6ODY1Njk2NjI2ODc2fQ.GWyLDvr78ABiQdNeRdLsMRWO-_d9q3VyMznrT6hkKyo&t=2023-10-07T21%3A14%3A36.394Z",
        friends: [],
        balance: [{amount: 50, cur: "USD"}],
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

export async function updateUser({
  password,
  fullName,
  birthDate,
  nickName,
  currentNickName,
}) {
  let updateData, userID;

  if (!password) updateData = { data: { fullName, birthDate } };
  if (password && fullName && birthDate)
    updateData = { password, data: { fullName, birthDate } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (nickName === currentNickName) {
    return { user: data.user, nickName: currentNickName };
  } else {
    userID = data.user.id;

    const { error } = await supabase
      .from("nickNames")
      .delete()
      .eq("userID", userID);

    if (error) throw new Error(error.message);

    const { error: errorNickNames } = await supabase
      .from("nickNames")
      .insert([{ userID, nickName }])
      .select();

    if (errorNickNames) throw new Error(errorNickNames.message);
    return { user: data.user, nickName };
  }
}

export async function uploadAvatar({ avatar, user }) {
  const fileName = `avatar-${user.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return { user: updatedUser.user, nickName: user.nickName };
}
