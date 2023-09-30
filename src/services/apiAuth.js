import supabase from "./supabase";

export async function signUp({
  email,
  password,
  fullName,
  nickName,
  birthDate,
  pesel,
}) {
  let userData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    const userID = data.user.id;

    const { data: userTableData, error: userTableError } = await supabase
      .from("profileData")
      .insert([{ userID, fullName, nickName, pesel, birthDate }])
      .select();

    if (userTableError) throw new Error(userTableError.message);
    userData = userTableData;
  } else {
    throw new Error(error.message);
  }
  return { data, userData };
}

export async function login({ password, email }) {
  let { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if(error) throw new Error(error.message);

  return { user };
}

export async function getCurrentUser() {
  let profileData;
  let user
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: userApi, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) throw new Error(errorUser.message);

  if (!errorUser) {
    const id = userApi.user.id;

    let { data: profileDataApi, error: errorProfileData } = await supabase
      .from("profileData")
      .select("*")
      .eq("userID", id);
      if (errorProfileData) throw new Error(errorProfileData.message);
      profileData = profileDataApi;
  }

  user = userApi.user
  profileData = profileData.at(0)

  return {user, profileData};
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
