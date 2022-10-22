import { string } from "prop-types";
import { generateButtonClass } from "../../helper";

const WithIcon = ({ children, ...props }) => {
  const { buttonVariant, buttonClass, ...newProps } = props;
  const icon = children[0];
  const text = children[1];
  const { light, dark } = generateButtonClass(buttonVariant);

  // prettier-ignore
  return (
    <button className={`${light} ${dark} ${buttonClass} font-roboto outline-none flex`} {...newProps} >
      {icon}
      {text}
    </button>
  );
};

WithIcon.propTypes = {
  buttonVariant: string,
  buttonClass: string,
};

WithIcon.defaultProps = {
  buttonVariant: "primary",
  buttonClass: "text-base p-2",
};

export default WithIcon;
