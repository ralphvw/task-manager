export default {
  createUser: `
    INSERT INTO users(
        email,
        password
    ) VALUES ($1, $2) RETURNING id, email
    `,

  findUserByEmail: `
    SELECT id, email, password FROM users WHERE email=$1
    `,
};
