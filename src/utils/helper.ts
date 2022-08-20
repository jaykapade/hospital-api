export const calcAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

export const calcBmi = (weight, height) => {
  return (weight / ((height * height) / 10000)).toFixed(2);
};
