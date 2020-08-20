export function validation(setError,loginCreds){
  const {emailOrUsername, password} = loginCreds;
  const error = {};
  if (!emailOrUsername) error.emailOrUsername = "Email or Username is required";
  if (!password) error.password = "Password is required";

  setError(error);

  return Object.keys(error).length === 0;
}