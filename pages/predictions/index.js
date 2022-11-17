import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
// prettier-ignore
import { Button, ComboBX, Gap, Header, Input, Loader, Meta, Tabel } from "../../components";
import { actions } from "../../providers/reducer/store";
import { generateRequestQuery, parseStockData } from "../../utils";

const Predictions = ({ props }) => {
  const { selectedIndex, selectedSector, selectedCode } = useSelector(
    (state) => state.global.prediction
  );
  const { setSelected, resetPredictionState } = actions.global;

  const { stocks, indices, sectors } = props;
  const parsedStock = parseStockData(stocks.data.data);

  const [loading, setloading] = useState(false);
  const [dataTable, setDatatable] = useState(parsedStock);

  const Alert = useAlert();
  const Dispatch = useDispatch();

  const searchHandler = async () => {
    if (!selectedIndex && !selectedSector && !selectedCode) {
      Alert.info({ msg: "Anda belum menentukan kriteria" });
      return true;
    }
    setloading(true);
    try {
      const queryParam = generateRequestQuery({
        index: selectedIndex,
        sector: selectedSector,
        code: selectedCode,
      });

      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stocks/${queryParam}`
      );

      const newDataTable = result.data.data.data;
      const parsedNewDataTable = parseStockData(newDataTable);
      setDatatable(parsedNewDataTable);
      setloading(false);
    } catch (error) {
      setloading(false);
      Alert.error({ msg: "Gagal memeuat data" });
    }
  };

  const resetHandler = () => {
    Dispatch(resetPredictionState({ type: "indexSectorCode" }));
    return true;
  };

  return (
    <>
      <Meta.Subtitle subtitle="Prediksi saham" />
      <div className="w-screen h-screen overflow-hidden div-theme">
        <Loader.Spinner loading={loading} />
        <Header handler={resetHandler} />
        <div className="h-full w-full bg-slate-200 dark:bg-slate-800 flex-center-x">
          <div className="w-dinamis bg-transparent dark:bg-transparent">
            <Gap heigh="h-4 bg-transparent dark:bg-transparent" />
            <h1 className="text-sm md:text-base lg:text-lg">
              Prediksi Harga penutupan saham
            </h1>
            <Gap heigh="h-1" />
            <p className="text-sm lg:text-base text-justify">
              Model prediksi dibangun dan dilatih menggunakan python kemudian
              dikonversikan ke format json. model kemudian dimuat menggunakan
              Tensorflow-js.
            </p>
            <Gap heigh="h-5" />
            <h1 className="text-sm md:text-base lg:text-lg">Cari kode saham</h1>
            <Gap heigh="h-2" />
            <div className="mx-4">
              <div className="grid-center-xy grid-cols-3">
                <h1 className="col-span-1 text-sm font-normal md:font-semibold lg:text-base self-center">
                  Indeks saham :
                </h1>
                <ComboBX
                  comboClass="col-span-2"
                  data={indices.data.data}
                  value={selectedIndex}
                  valueData="Name"
                  onChange={(selected) => {
                    Dispatch(setSelected({ type: "index", value: selected }));
                  }}
                />
              </div>
              <Gap heigh="h-2" />
              <div className="grid grid-cols-3">
                <h1 className="col-span-1 text-sm font-normal md:font-semibold lg:text-base self-center">
                  Sektor saham :
                </h1>
                <ComboBX
                  comboClass="col-span-2"
                  data={sectors.data.data}
                  value={selectedSector}
                  valueData="name"
                  onChange={(selected) => {
                    Dispatch(setSelected({ type: "sector", value: selected }));
                  }}
                />
              </div>
              <Gap heigh="h-2" />
              <div className="grid grid-cols-3">
                <h1 className="col-span-1 text-sm font-normal md:font-semibold lg:text-base self-center">
                  Kode saham :
                </h1>
                <Input.Noborder
                  inputClass="col-span-2 bg-slate-300 dark:bg-slate-900 text-sm lg:text-base py-1 px-3 rounded-md"
                  value={selectedCode || ""}
                  onChange={(e) =>
                    Dispatch(
                      setSelected({ type: "code", value: e.target.value })
                    )
                  }
                />
              </div>
              <Gap heigh="h-4" />
              <div className="grid grid-cols-3">
                <Gap width="col-span-1" />
                <div className="col-span-2 flex space-x-2">
                  <Button.Success
                    buttonClass="w-fit py-1 px-2 rounded-md"
                    onClick={searchHandler}
                  >
                    Cari
                  </Button.Success>
                  <Button.Danger
                    buttonClass="w-fit py-1 px-2 rounded-md"
                    onClick={resetHandler}
                  >
                    Reset
                  </Button.Danger>
                </div>
              </div>
            </div>
            <Gap heigh="h-5" />
            <h1>Tabel</h1>
            <Gap heigh="h-2" />
            <div className="overflow-scroll overflow-y-scroll h-[400px] bg-slate-400 dark:bg-slate-900">
              <Tabel data={dataTable} type="stock table" withModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Predictions.getInitialProps = async (ctx) => {
  const stocks = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/stocks/search?page=1&per_page=25`
  );

  const indices = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/stocks/indices`
  );

  const sectors = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/stocks/sectors`
  );

  if (stocks && indices && sectors) {
    return {
      props: {
        stocks: stocks.data,
        indices: indices.data,
        sectors: sectors.data,
      },
    };
  }
};

export default Predictions;
