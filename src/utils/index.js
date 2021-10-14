export const secretPhone = phone => {
  if (!phone) return "";
  return phone.replace(/(\d{1,4})\w{4}(\d{1,3})/, "$1****$2");
};
