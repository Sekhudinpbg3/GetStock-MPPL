const generateClass = (alertType) => {
  if (alertType === "success") {
    return {
      divClass: "bg-blue-100 border-blue-500",
      titleClass: "text-blue-500",
    };
  }

  if (alertType === "info") {
    return {
      divClass: "bg-yellow-100 border-yellow-500",
      titleClass: "text-yellow-500",
    };
  }

  if (alertType === "error") {
    return {
      divClass: "bg-pink-100 border-pink-500",
      titleClass: "text-pink-500",
    };
  }
};

const AlertTemplate = ({ id, message, close, style, options }) => {
  const { divClass, titleClass } = generateClass(options.type);
  console.log(message);
  return (
    <div key={id} style={style}>
      <p className={`${divClass} ${titleClass}`}>Ini adalah alert</p>
    </div>
  );
};

export default AlertTemplate;
