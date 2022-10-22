const generateButtonClass = (variant) => {
  if (variant === "primary") {
    return {
      light: "text-white bg-blue-600",
      dark: "dark:text-slate-300 dark:hover:text-slate-400 dark:bg-blue-800 dark:hover:bg-blue-900",
    };
  }

  if (variant === "secondary") {
    return {
      light: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100",
      dark: "dark:text-slate-300 dark:hover:text-slate-400 dark:bg-blue-800 dark:hover:bg-blue-900",
    };
  }

  if (variant === "danger") {
    return {
      light: "text-white bg-pink-600",
      dark: "dark:text-slate-300 dark:hover:text-slate-400 dark:bg-pink-600 dark:hover:bg-pink-600",
    };
  }

  if (variant === "primary-opacity") {
    return {
      light: "text-blue-500 bg-blue-100 hover:bg-blue-200",
      dark: "dark:text-blue-500 dark:bg-blue-100 dark:hover:bg-blue-200",
    };
  }

  if (variant === "secondary-opacity") {
    return {
      light: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100",
      dark: "dark:text-slate-300 dark:hover:text-slate-400 dark:bg-blue-800 dark:hover:bg-blue-900",
    };
  }

  if (variant === "danger-opacity") {
    return {
      light: "text-pink-500 bg-pink-100 hover:bg-pink-200",
      dark: "dark:text-pink-500 dark:bg-pink-100 dark:hover:bg-pink-200",
    };
  }
};

const generateInputClass = (variant) => {
  if (variant === "border") {
    return {
      light:
        "text-gray-500 bg-white border border-gray-200 focus:border-blue-400 focus:invalid:border-pink-400",
      dark: "border-gray-200 dark:focus:border-blue-400 dark:focus:invalid:border-pink-400",
    };
  }

  if (variant === "no-border") {
    return {
      light: "text-gray-500 bg-white focus:invalid:bg-pink-100",
      dark: "dark:focus:invalid:bg-pink-400",
    };
  }

  if (variant === "borderCustom") {
    return {
      light: "bg-white border focus:invalid:border-pink-400",
      dark: "dark:focus:invalid:border-pink-400",
    };
  }

  if (variant === "no-borderCustom") {
    return {
      light: "focus:invalid:bg-pink-100",
      dark: "border-none",
    };
  }
};

const generateNormalTogleClass = () => {
  return {
    switchClass:
      "relative inline-flex items-center h-[10px] w-[25px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
    spanClass:
      "pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full border-2 shadow-lg ring-0 transition duration-200 ease-in-out",
  };
};

const backgrounds = [
  'bg-red-400',
  'bg-orange-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',
];
const generateRandomBg = () => {
  const random = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[random];
};

export { generateButtonClass, generateInputClass, generateNormalTogleClass, generateRandomBg };
