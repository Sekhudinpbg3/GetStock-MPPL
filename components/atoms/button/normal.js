import { number, oneOfType, string } from "prop-types";
import { generateButtonClass } from "../../helper";

const Normal = ({ children, ...props }) => {
  const { buttonVariant, buttonClass, ...newProps } = props;
  const { light, dark } = generateButtonClass(buttonVariant);

  // prettier-ignore
  return (
    <button className={`${light} ${dark} ${buttonClass} font-roboto outline-none`} {...newProps} >
      {children}
    </button>
  );
};

Normal.propTypes = {
  buttonVariant: string,
  buttonClass: string,
  children: oneOfType([string, number]),
};

Normal.defaultProps = {
  buttonVariant: "primary",
  buttonClass: "text-base p-2",
  children: "Button",
};

export default Normal;
