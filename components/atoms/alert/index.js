import { ErrorIcon, InfoIcon, SuccesIcon } from "@/assets";
import { Button } from "../button";
import Gap from "../gap";

const generateStyle = (Type) => {
  if (Type === "success")
    return { divStyle: "bg-blue-100 border-blue-500", titleStyle: "text-blue-500", title: "success" };
  if (Type === "info")
    return { divStyle: "bg-yellow-100 border-yellow-500", titleStyle: "text-yellow-500", title: "info" };
  if (Type === "error") return { divStyle: "bg-pink-100 border-pink-500", titleStyle: "text-pink-500", title: "error" };
};

const AlertTemplate = ({ message, ...props }) => {
  const { id, style, close, options } = props;
  const { divStyle, titleStyle, title: titleDefault } = generateStyle(options.type);
  const { msg, title } = message;

  return (
    <div style={style} key={id}>
      <Gap heigh='h-5' />
      <div className='relative w-52 p-2 bg-white dark:bg-slate-800 drop-shadow-md rounded-md'>
        <div className='w-full flex justify-center dark:bg-slate-800'>
          <div
            className={`${divStyle} w-8 h-8 rounded-full border-2 -mt-6 flex justify-center items-center animate-bounce dark:bg-slate-800`}>
            {options.type === "info" ? <InfoIcon fill='fill-yellow-500' /> : null}
            {options.type === "success" ? <SuccesIcon fill='fill-blue-500' /> : null}
            {options.type === "error" ? <ErrorIcon fill='fill-pink-500' /> : null}
          </div>
        </div>
        <Gap heigh='h-2 dark:bg-slate-800' />
        <h1 className={`${titleStyle} text-center text-sm`}>{title || titleDefault}</h1>
        <Gap heigh='h-2 dark:bg-slate-800' />
        <p className='text-center text-sm'>{msg || "Message"}</p>
        <Gap heigh='h-3 dark:bg-slate-800' />
        <div
          className={`${options.buttonHide ? "hidden" : "w-full flex justify-center items-center dark:bg-slate-800"}`}>
          <Button.Opacity opacity='primary' onClick={close} buttonClass='text-sm px-2 py-0.5 rounded-md font-semibold'>
            Ok
          </Button.Opacity>
        </div>
      </div>
    </div>
  );
};

export default AlertTemplate;
