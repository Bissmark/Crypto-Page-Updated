const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // Convert the string to a number by parsing it
    const value = parseFloat(payload[0].value);

    // Check if parsing was successful
    if (!isNaN(value)) {
      // Format the number with fixed decimal places and locale string
      const formattedValue = value.toFixed(2).toLocaleString();
      return (
        <div className="custom-tooltip">
          <p className="label">${formattedValue}</p>
        </div>
      );
    } else {
      // If parsing fails, use the original string
      return (
        <div className="custom-tooltip">
          <p className="label">${payload[0].value}</p>
        </div>
      );
    }
  }

  return null;
};

export default CustomTooltip;