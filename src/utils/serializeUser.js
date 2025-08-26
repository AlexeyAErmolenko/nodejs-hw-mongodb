const serializeUser = (user) => ({
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
});
export default serializeUser;
