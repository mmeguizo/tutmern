function formatDate(timestamps) {
  const date = new Date(parseInt(timestamps));
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// react-dom_client.js?v=cdc1bf18:1458 The specified value "1741046400000" does not conform to the required format, "yyyy-MM-dd".
function dateToString(dateValue) {
  try {
    // Check if dateValue is a timestamp (number or numeric string)
    const timestamp = parseInt(dateValue);
    if (!isNaN(timestamp)) {
      // Convert timestamp to Date object
      const date = new Date(timestamp);

      // Format as YYYY-MM-DD (required format for HTML date inputs)
      const year = date.getFullYear();
      // getMonth() returns 0-11, so add 1 and pad with leading zero if needed
      const month = String(date.getMonth() + 1).padStart(2, "0");
      // Pad day with leading zero if needed
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }

  // If dateValue is already formatted correctly or if conversion fails, return the original value
  return dateValue;
}

function upperCaseFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export { formatDate, upperCaseFirstLetter, formatCurrency, dateToString };
