import { HideIcon, UnHideIcon } from "@/assets";
import { useState } from "react";

const Border = ({ inputClass, inputPassword, ...props }) => {
  const [inputType, setInputType] = useState("text");
  const [border, setBorder] = useState("border-gray-300 dark:border-slate-700");

  const showHandler = () => {
    if (inputType === "text") setInputType("password");
    if (inputType === "password") setInputType("text");
  };

  if (!inputPassword) return <input className={`input input-border ${inputClass ? inputClass : "p-0"}`} {...props} />;
  if (inputPassword)
    return (
      <div className={`input flex-center-y space-x-1 px-1 border-2 transition-all duration-700 ${border}`}>
        <button className='bg-transparent' onClick={showHandler}>
          {inputType === "text" ? <UnHideIcon iconClass='btn-input-show' /> : null}
          {inputType === "password" ? <HideIcon iconClass='btn-input-show' /> : null}
        </button>
        <input
          type={inputType}
          className={`input-password ${inputClass ? inputClass : "p-0"}`}
          onFocus={() => {
            setBorder("border-blue-300 dark:border-blue-700");
          }}
          onBlur={() => setBorder("border-gray-300 dark:border-slate-700")}
          {...props}
        />
      </div>
    );
};

export default Border;
