function formatPercentage(num) {
  if (isNaN(num)) {
    return "";
  }
  return (num * 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 20}) + "%";
}

console.log(formatPercentage(0.11));