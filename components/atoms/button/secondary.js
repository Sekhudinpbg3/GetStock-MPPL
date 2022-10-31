const Secondary = ({ children, buttonClass, buttonIcon, ...props }) => {
  const iconStyle = buttonIcon ? "flex justify-center items-center" : null;

  return (
    <button {...props} className={`btn btn-secondary ${buttonClass} ${iconStyle}`}>
      {buttonIcon ? children.map((child) => child) : children}
    </button>
  );
};

export default Secondary;
