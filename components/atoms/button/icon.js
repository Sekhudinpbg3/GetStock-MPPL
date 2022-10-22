import { number, oneOfType, string, any } from "prop-types";

const Icon = ({ children, ...props }) => {
  const { buttonClass, ...newProps } = props;

  return (
    <button className={`${buttonClass} font-roboto outline-none`} {...newProps}>
      {children}
    </button>
  );
};

Icon.propTypes = {
  buttonClass: string,
  children: oneOfType([string, number, any]),
};

Icon.defaultProps = {
  buttonClass: "text-base p-2",
  children: "Button",
};

export default Icon;
