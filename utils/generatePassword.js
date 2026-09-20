function generateLetterOnlyPassword(length = 10) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const all = upper + lower;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * all.length);
    password += all[randomIndex];
  }
  return password;
}

module.exports = generateLetterOnlyPassword;