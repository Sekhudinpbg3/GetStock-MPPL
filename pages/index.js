import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import("@tensorflow/tfjs");
import * as cocossd from "@tensorflow-models/coco-ssd";
import { ImgComvis, ImgPredictions } from "../assets";
import { Meta, Gap, NextImage, Loader } from "../components";
import { actions } from "../providers/reducer/store";

const Homepage = () => {
  const { comvis } = useSelector((state) => state.global);
  const { setStateComvis } = actions.global;

  const [loading, setLoading] = useState(false);

  const Dispatch = useDispatch();
  const Route = useRouter();

  const toComvis = async () => {
    setLoading(true);
    const model = await cocossd.load();
    const dev = await navigator.mediaDevices.enumerateDevices();
    const devices = dev.filter(({ kind }) => kind === "videoinput");
    Dispatch(setStateComvis({ model, devices }));
    setLoading(false);
    Route.push("/comvis");
  };

  const toPrediction = () => {
    setLoading(true);
    Route.push("/predictions");
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <>
      <Meta.Subtitle title="Welcome" subtitle="Selamat datang" />
      <div className="h-screen w-screen overflow-hidden div-theme">
        <Loader.Spinner loading={loading} />
        <div className="grid-center-xy">
          <Gap heigh="h-3" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-green-600">
            GetStock
          </h1>
          <Gap heigh="h-1" />
        </div>
        <p className="text-center mx-5 text-sm md:text-base xl:text-lg">
          Getstock adalah hasil implementasi materi yang dipelajari selama studi
          indepdendent khususnya computer vision dan data sains
        </p>
        <Gap heigh="h-10 md:h-16 lg:h-24 " />
        <div className="grid-center-xy md:flex md:space-x-24 lg:space-x-36 gap-y-10">
          <div className="w-64 md:w-80 xl:w-96 p-4 rounded-lg drop-shadow bg-white dark:bg-slate-800">
            <NextImage src={ImgPredictions} priority />
            <Gap heigh="h-1" />
            <button onClick={toPrediction} className="w-full">
              <h1 className="text-center text-sm lg:text-base btn btn-success cursor-pointer py-1 md:py-1.5 rounded-md">
                Stock Prediction
              </h1>
            </button>
          </div>

          <div className="w-64 md:w-80 xl:w-96 p-4 rounded-lg drop-shadow bg-white dark:bg-slate-800">
            <NextImage src={ImgComvis} priority />
            <Gap heigh="h-1" />
            <button onClick={toComvis} className="w-full">
              <h1 className="text-center text-sm lg:text-base btn btn-success cursor-pointer py-1 md:py-1.5 rounded-md">
                Object Detection
              </h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
