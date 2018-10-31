
class User {
  constructor({ email, displayName, id }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
  }

  getDisplayName() {
    return this.displayName;
  }

  static getAuthenticatedUserInstance() {
    if (User.CURRENT) return User.CURRENT;
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user) return null;
    User.CURRENT = new User(JSON.parse(user));
    User.X_AUTH = token;
    return User.CURRENT;
  }

  static getAuthenticatedUserToken() {
    if (User.X_AUTH) return User.X_AUTH;
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user) return null;
    User.CURRENT = new User(JSON.parse(user));
    User.X_AUTH = token;
    return User.X_AUTH;
  }

  static signIn({ user, token }) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      User.CURRENT = new User(user);
    }
    if (token) {
      localStorage.setItem('token', token);
      User.X_AUTH = token;
    }
  }
}

export default User;
