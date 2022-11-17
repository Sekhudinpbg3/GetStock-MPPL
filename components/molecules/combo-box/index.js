import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronUpIcon } from "../../../assets";

const defaultData = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const ComboBX = ({
  comboClass,
  data = defaultData,
  defaultSelected,
  valueData,
  ...newProps
}) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((dt) =>
          dt[valueData]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox as="div" className={`${comboClass} relative`} {...newProps}>
      <div className="flex py-1 pl-3 pr-1 rounded-md bg-slate-300 dark:bg-slate-900">
        <Combobox.Input
          className="input-noborder bg-slate-300 dark:bg-slate-900 text-sm lg:text-base"
          onChange={(e) => setQuery(e.target.value)}
          displayValue={(picked) => (picked ? picked[valueData] : "")}
        />
        <Combobox.Button className="rounded-md">
          <ChevronUpIcon />
        </Combobox.Button>
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options className="bg-transparent dark:bg-transparent absolute w-full z-10">
          <div className="mt-2 py-1 bg-white dark:bg-slate-900 rounded-md max-h-52 overflow-y-scroll shadow-md">
            {filteredData.length !== 0 ? (
              filteredData.map((dt, idx) => (
                <Combobox.Option
                  key={idx}
                  value={dt}
                  className={({ active }) =>
                    active
                      ? "px-3 bg-green-400 dark:bg-green-900 text-white text-sm py-0.5 disable-outline"
                      : "px-3 hover:bg-green-400 dark:hover:bg-green-900 text-sm py-0.5 hover:text-white disable-outline"
                  }
                >
                  {dt[valueData]}
                </Combobox.Option>
              ))
            ) : (
              <p className="text-sm py-0.5 px-3 text-pink-500">
                data tidak ditemukan
              </p>
            )}
          </div>
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default ComboBX;
