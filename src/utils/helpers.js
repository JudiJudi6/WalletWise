export const formatCurrency = (value) => {
  value = +value
  return value ? value.toFixed(2) : value;
};
