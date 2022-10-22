import { number, oneOfType, string } from "prop-types";

const Text = ({ children, ...props }) => {
  const { buttonClass, ...newProps } = props;

  return (
    <button className={`${buttonClass} font-roboto outline-none`} {...newProps}>
      {children}
    </button>
  );
};

Text.propTypes = {
  buttonClass: string,
  children: oneOfType([string, number]),
};

Text.defaultProps = {
  buttonClass: "text-base p-2",
  children: "Button",
};

export default Text;
