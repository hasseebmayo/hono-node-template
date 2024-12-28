import bcrypt from "bcrypt";

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares a password with a hashed password.
 *
 * @param {string} password - The password to be compared.
 * @param {string} hashedPassword - The hashed password to compare with.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, and `false` otherwise.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
