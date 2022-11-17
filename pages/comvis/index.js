import { Fragment, useEffect, useRef, useState } from "react";
import("@tensorflow/tfjs");
import * as cocossd from "@tensorflow-models/coco-ssd";
import { useAlert } from "react-alert";
import Webcam from "react-webcam";
import { Listbox, Transition } from "@headlessui/react";
import { Button, Gap, Header, Loader, Meta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { actions } from "../../providers/reducer/store";

const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = "#" + color;
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "#" + color;
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

const Comvis = () => {
  const { model, devices } = useSelector((state) => state.global.comvis);
  const { setStateComvis } = actions.global;

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(false);

  // const loading

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const Alert = useAlert();
  const Router = useRouter();
  const Dispatch = useDispatch();

  const detectObject = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await model.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  const runModel = async () => {
    setInterval(() => {
      detectObject();
    }, 10);
  };

  const headerHandler = () => {
    setSelectedDevice(null);
    return false;
  };

  const refreshHandler = async () => {
    setLoading(true);
    const model = await cocossd.load();
    const dev = await navigator.mediaDevices.enumerateDevices();
    const devices = dev.filter(({ kind }) => kind === "videoinput");
    Dispatch(setStateComvis({ model, devices }));
    setLoading(false);
  };

  useEffect(() => {
    if (model && devices) {
      runModel();
    }
  });

  useEffect(() => {
    if (!model || !devices) {
      setTimeout(() => {
        Alert.error({ msg: "Model gagal dimuat", buttonHide: true });
      }, 200);
      return;
    }

    if (model && devices) {
      setTimeout(() => {
        Alert.success({ msg: "Model berhasil dimuat", buttonHide: true });
      }, 200);
      return;
    }
  }, [model, devices, Alert, Router]);

  return (
    <>
      <Meta.Subtitle subtitle="Deteksi objek" />
      <div className="w-screen h-screen overflow-hidden div-theme">
        <Loader.Spinner loading={loading} />
        <Header handler={headerHandler} />
        <div className="h-full w-full bg-slate-200 dark:bg-slate-800 flex-center-x">
          <div className="w-dinamis bg-transparent dark:bg-transparent">
            <Gap heigh="h-4 bg-transparent dark:bg-transparent" />
            <h1 className="text-sm lg:text-base">
              Deteksi objek menggunakan tensorflow-js
            </h1>
            <Gap heigh="h-5 bg-transparent dark:bg-transparent" />

            <Listbox value={selectedDevice} onChange={setSelectedDevice}>
              {({ open }) => (
                <>
                  <Listbox.Button className="btn btn-success py-0.5 w-full rounded-full">
                    <p className="text-slate-200">Pilih kamera</p>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="mt-2 rounded-md bg-white dark:bg-slate-900 py-4 absolute z-20 w-64 outline-none">
                      {devices ? (
                        Object.keys(devices).map((device, index) => (
                          <Listbox.Option
                            key={index}
                            value={devices[device]}
                            className="rounded-md p-0.5"
                          >
                            {({ selected }) => (
                              <button
                                className={
                                  selected
                                    ? "py-1 px-5 bg-green-300 dark:bg-gray-800 w-full"
                                    : "cursor-pointer hover:bg-green-300 dark:hover:bg-gray-800 py-1 px-5 w-full"
                                }
                              >
                                <p>Camera {index}</p>
                              </button>
                            )}
                          </Listbox.Option>
                        ))
                      ) : (
                        <div>
                          <p className="py-1 px-5 text-center text-pink-500">
                            device tidak terdeteksi
                          </p>
                        </div>
                      )}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>

            <Gap heigh="h-5" />

            <div>
              {selectedDevice ? (
                <div className="relative rounded">
                  <Webcam
                    className="w-full h-[600px] bg-slate-300 dark:bg-slate-900 rounded"
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ deviceId: selectedDevice.deviceId }}
                  />
                  <canvas
                    ref={canvasRef}
                    className={
                      "absolute mx-auto top-0 left-0 right-0 text-center w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] xl:h-[35rem] z-10"
                    }
                  />
                </div>
              ) : (
                <div className="grid-center-xy w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] xl:h-[35rem] bg-slate-300 dark:bg-slate-900 rounded">
                  {!model || !devices ? (
                    <p>Model gagal dimuat, tekan refresh untuk mengulangi</p>
                  ) : (
                    <p>Model berhasil dimuat, pilih kamera</p>
                  )}
                  {!model || !devices ? (
                    <Button.Opacity
                      buttonClass="px-2 py-1 m-2 rounded-full text-sm"
                      opacity="success"
                      onClick={refreshHandler}
                    >
                      Refresh
                    </Button.Opacity>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Comvis;
