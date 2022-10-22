import { string } from "prop-types";
import { useState } from "react";
import { HideIcon, UnHideIcon } from "../../../assets";
import { generateInputClass } from "../../helper";

const WithIcon = (props) => {
  const { inputVariant, inputClass, type, divClass, ...newProps } = props;
  const { light, dark } = generateInputClass(inputVariant);

  const [inputAs, setInputAs] = useState(type || "password");

  const buttonHandler = () => {
    if (inputAs === "password") {
      setInputAs("text");
      return;
    }

    if (inputAs !== "password") {
      setInputAs("password");
      return;
    }
  };

  return (
    // prettier-ignore
    <div className={`${light} ${dark} ${divClass} items-center flex px-1`} >
      <button onClick={buttonHandler} className="flex justify-center items-center pr-1" >
      {inputAs === 'password' ? <HideIcon size="h-6 w-6" fill="fill-gray-400 dark:fill-slate-500" /> : null}
        {inputAs !== 'password' ? <UnHideIcon size="h-6 w-6" fill="fill-gray-400 dark:fill-slate-500" /> : null}
      </button>
      <input
        className={`${inputClass} w-full font-roboto outline-none focus:placeholder-transparent`}
        type={inputAs}
        {...newProps}
      />
    </div>
  );
};

WithIcon.propTypes = {
  inputVariant: string,
  inputClass: string,
  type: string,
  divClass: string,
};

WithIcon.defaultProps = {
  inputVariant: "border",
  inputClass: "p-2",
  type: "password",
  divClass: "w-fit",
};

export default WithIcon;
