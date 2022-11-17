import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as tfjs from "@tensorflow/tfjs";
import { actions } from "../../../providers/reducer/store";
import { Button, Gap, Input, Loader } from "../../atoms";
import Modal from "../modal";

const Tabel = ({ data, type, withModal, onClick }) => {
  const { stock } = useSelector((state) => state.global.prediction);
  const { setSelected } = actions.global;

  const [loading, setloading] = useState(false);

  const Dispatch = useDispatch();

  const selectHandler = (data) => {
    const { Kode: Code, Open = 0, High = 0, Low = 0 } = data;
    Dispatch(setSelected({ type: "input", value: { Code, Open, High, Low } }));
  };

  const predictionHandler = async () => {
    Dispatch(setSelected({ type: "inputStock", name: "result", value: "" }));
    setloading(true);
    try {
      const { open, high, low } = stock.input;
      const ANNs = await tfjs.loadLayersModel(
        `${process.env.NEXT_PUBLIC_APP_URL}/model/model.json`
      );

      const input = tfjs.tensor([
        [parseInt(open), parseInt(high), parseInt(low)],
      ]);

      if (ANNs && input) {
        const prediction = ANNs.predict(input);
        const resultArray = await prediction.data();
        const closePrice = parseFloat(resultArray[0]).toFixed(2);
        Dispatch(
          setSelected({ type: "inputStock", name: "result", value: closePrice })
        );
        setloading(false);
        return false;
      }

      setloading(false);
      return false;
    } catch (error) {
      setloading(false);
      return false;
    }
  };

  const cancellHandler = () => {
    Dispatch(setSelected({ type: "inputStock", name: "result", value: "" }));
    return true;
  };

  return (
    <>
      <Loader.Spinner loading={loading} />
      <div className="bg-slate-300 dark:bg-slate-900">
        {data && data.length !== 0 ? (
          <table className="whitespace-nowrap">
            <thead>
              <tr>
                {Object.keys(data[0]).map((colName, idx) => (
                  <th
                    scope={`row`}
                    key={idx}
                    className={
                      idx === 0
                        ? `sticky left-0 top-0 z-10 px-8 py-2 bg-slate-500 dark:bg-slate-900`
                        : `sticky top-0 px-8 py-2 bg-slate-500 dark:bg-slate-900`
                    }
                  >
                    <h1 className="text-slate-300 text-sm">{colName}</h1>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((dt, idx) => (
                <tr
                  key={idx}
                  className={
                    idx % 2 ? `bg-slate-300 dark:bg-slate-200` : `bg-white`
                  }
                >
                  {Object.keys(dt).map((dt1, idx1) => (
                    <td
                      key={idx1}
                      className={
                        idx1 === 0
                          ? `sticky left-0 z-0 text-center bg-white`
                          : `text-center`
                      }
                    >
                      {idx1 === 0 ? (
                        withModal && type === "stock table" ? (
                          <Modal.DialogCustom
                            type="custom"
                            noAlert
                            buttonConfirm={{
                              title: "Prediksi",
                              onClick: predictionHandler,
                            }}
                            buttonCancel={{ onClick: cancellHandler }}
                          >
                            {/* prettier-ignore */}
                            <Button.Opacity opacity="success" buttonClass="rounded-md w-full text-sm" onClick={()=>selectHandler(dt)}>
                            {dt[dt1]}
                          </Button.Opacity>
                            <div className="m-4 w-56">
                              <h1 className="text-sm text-green-600">
                                Saham {dt[dt1]}
                              </h1>
                              <p className="text-sm">({dt["Nama"]})</p>
                              <Gap heigh="h-4" />
                              <div className="grid grid-cols-3">
                                <h1 className="col-span-1 text-sm font-normal md:font-semibold lg:text-base self-center">
                                  Open
                                </h1>
                                <Input.Noborder
                                  type="number"
                                  placeholder={stock.input.open}
                                  inputClass="bg-slate-300 dark:bg-slate-800 text-sm lg:text-base py-1 px-2 rounded-md col-span-2"
                                  onChange={(e) => {
                                    Dispatch(
                                      setSelected({
                                        type: "inputStock",
                                        name: "open",
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-3 mt-2">
                                <h1 className="col-span-1 text-sm font-normal md:font-semibold lg:text-base self-center">
                                  High
                                </h1>
                                <Input.Noborder
                                  type="number"
                                  placeholder={stock.input.high}
                                  inputClass="bg-slate-300 dark:bg-slate-800 text-sm lg:text-base py-1 px-2 rounded-md col-span-2"
                                  onChange={(e) => {
                                    Dispatch(
                                      setSelected({
                                        type: "inputStock",
                                        name: "high",
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-3 mt-2">
                                <h1 className="col-span-1 text-sm font-normal md:font-semibold lg:text-base self-center">
                                  Low
                                </h1>
                                <Input.Noborder
                                  type="number"
                                  placeholder={stock.input.low}
                                  inputClass="bg-slate-300 dark:bg-slate-800 text-sm lg:text-base py-1 px-2 rounded-md col-span-2"
                                  onChange={(e) => {
                                    Dispatch(
                                      setSelected({
                                        type: "inputStock",
                                        name: "low",
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <Gap heigh="h-4" />
                              <div className="w-full bg-slate-300 dark:bg-slate-800 py-2 rounded-md">
                                <h1 className="text-green-600 text-sm">
                                  Hasil prediksi
                                </h1>
                                <div className="h-24 grid-center-xy">
                                  <p className="font-bold text-2xl">
                                    {stock.result
                                      ? `IDR ${stock.result}`
                                      : "IDR -"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Modal.DialogCustom>
                        ) : (
                          <Button.Opacity
                            opacity="success"
                            buttonClass="rounded-md w-full text-sm"
                            onClick={() => onClick()}
                          >
                            {dt[dt1]}
                          </Button.Opacity>
                        )
                      ) : (
                        <p className="text-sm">{dt[dt1]}</p>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid-center-xy w-full h-96">
            <p className="text-center">Data not found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Tabel;
