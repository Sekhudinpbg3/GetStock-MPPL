import { string } from "prop-types";
import { generateInputClass } from "../../helper";

const Normal = ({ children, ...props }) => {
  const { inputVariant, inputClass, ...newProps } = props;
  const { light, dark } = generateInputClass(inputVariant);

  return (
    <input
      className={`${light} ${dark} ${inputClass} font-roboto outline-none focus:placeholder-transparent`}
      {...newProps}
    />
  );
};

Normal.propTypes = {
  inputClass: string,
  inputVariant: string,
};

Normal.defaultProps = {
  inputClass: "p-2",
  inputVariant: "border",
};

export default Normal;
