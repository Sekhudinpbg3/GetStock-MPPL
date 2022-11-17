import { createSlice } from "@reduxjs/toolkit";

const Global = createSlice({
  name: "Global",
  initialState: {
    comvis: {
      model: "",
      devices: "",
    },
    prediction: {
      selectedIndex: "",
      selectedSector: "",
      selectedCode: "",
      stock: {
        code: "",
        input: {
          open: 0,
          high: 0,
          low: 0,
        },
        result: "",
      },
    },
  },
  reducers: {
    setStateComvis: (state, action) => {
      const { model, devices } = action.payload;
      state.comvis.model = model;
      state.comvis.devices = devices;
    },

    resetPredictionState: (state, { payload }) => {
      const { type } = payload;
      if (type === "indexSectorCode") {
        state.prediction.selectedIndex = "";
        state.prediction.selectedSector = "";
        state.prediction.selectedCode = "";
      }

      if ((type = "inputStock")) {
        state.prediction.stock.input.open = "";
        state.prediction.stock.input.high = "";
        state.prediction.stock.input.low = "";
      }
    },

    setSelected: (state, { payload }) => {
      const { type, name, value } = payload;
      if (type === "index" || type === "sector" || type === "code") {
        if (type === "index") {
          state.prediction.selectedIndex = value;
        }

        if (type === "sector") {
          state.prediction.selectedSector = value;
        }

        if (type === "code") {
          state.prediction.selectedCode = value;
        }
      }

      if (type === "input" || type === "result") {
        const { Code, Open, High, Low } = value;

        state.prediction.stock.code = Code;
        state.prediction.stock.input.open = Open;
        state.prediction.stock.input.high = High;
        state.prediction.stock.input.low = Low;
      }

      if ((type = "inputStock")) {
        if (name === "open") {
          if (value) {
            state.prediction.stock.input.open = value;
          } else {
            state.prediction.stock.input.open = "";
          }
        }

        if (name === "high") {
          if (value) {
            state.prediction.stock.input.high = value;
          } else {
            state.prediction.stock.input.high = "";
          }
        }

        if (name === "low") {
          if (value) {
            state.prediction.stock.input.low = value;
          } else {
            state.prediction.stock.input.low = "";
          }
        }

        if (name === "result") {
          if (value) {
            state.prediction.stock.result = value;
          } else {
            state.prediction.stock.result = "";
          }
        }
      }
    },
  },
});

export default Global;
