import axios from "axios";
import * as yup from "yup";
import moment from "moment";

const PasarDana = axios.create({
  baseURL: "https://pasardana.id/api/",
  headers: {
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    Host: "pasardana.id",
    Pragma: "no-cache",
    Referer: "https://pasardana.id/stock/search",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
  },
});

const SORTABLE_FIELDS = [
  "Code",
  "Name",
  "SectorName",
  "SubSectorName",
  "Last",
  "AdjustedClosingPrice",
  "PrevClosingPrice",
  "AdjustedOpenPrice",
  "AdjustedHighPrice",
  "AdjustedLowPrice",
  "Per",
  "Pbr",
  "Volume",
  "Value",
  "Frequency",
  "OneDay",
  "OneWeek",
  "OneMonth",
  "ThreeMonth",
  "SixMonth",
  "OneYear",
  "ThreeYear",
  "FiveYear",
  "TenYear",
  "Mtd",
  "Ytd",
  "Capitalization",
  "BetaOneYear",
  "StdevOneYear",
  "LastDate",
];

const PasarDanaSchema = yup.object().shape({
  search: yup.string().trim(),
  page: yup.number().positive().integer().default(1),
  per_page: yup.number().positive().integer().default(25),
  sort_by: yup.string().trim().oneOf(SORTABLE_FIELDS).default("Code"),
  sort_direction: yup
    .string()
    .trim()
    .lowercase()
    .oneOf(["asc", "desc"])
    .default("asc"),
  index_id: yup.number().positive().integer(),
  sector_id: yup.number().positive().integer(),
  subsector_id: yup.number().positive().integer(),
});

const parseStockData = (data) => {
  const newData = data.map((stock) => {
    return {
      Kode: stock.Code ? stock.Code : "Code Undifined",
      Nama: stock.Name ? stock.Name : "Name Undifined",
      Sektor: stock.NewSectorName ? stock.NewSectorName : "-",
      "Sub Industri": stock.NewSubIndustryName ? stock.NewSubIndustryName : "-",
      Last: stock.Last || "0",
      Previous: stock.PrevClosingPrice || "0",
      Open: stock.AdjustedOpenPrice || "0",
      High: stock.AdjustedHighPrice || "0",
      Low: stock.AdjustedLowPrice || "0",
      PER: stock.Per || "-",
      PBV: stock.Pbr || "-",
      Volume: stock.Volume || "-",
      Value: stock.Value || "-",
      "Frekuensi Perdagangan": stock.Frequency || "-",
      ROE: stock.Roe ? stock.Roe.toFixed(4) : "-",
      "1 Hari": stock.OneDay ? (stock.OneDay * 100).toFixed(2) : "-",
      MtD: stock.Mtd ? (stock.Mtd * 100).toFixed(2) : "-",
      "1 Bulan": stock.OneMonth ? (stock.OneMonth * 100).toFixed(2) : "-",
      YtD: stock.Ytd ? (stock.Ytd * 100).toFixed(2) : "-",
      "1 Tahun": stock.OneYear ? (stock.OneYear * 100).toFixed(2) : "-",
      "Market Capital": stock.Capitalization || "-",
      "Last Update": stock.LastUpdate
        ? moment(stock.LastUpdate).local().format("LL")
        : "-",
    };
  });

  return newData;
};

const generateRequestQuery = ({ index, sector, code }) => {
  let query = "search?";
  query+='per_page=100'
  if (index) {
    query += `&index_id=${index.Id}`;
  }

  if (sector) {
    query += `&sector_id=${sector.id}`;
  }

  if (code) {
    query += `&search=${code}`;
  }

  return query;
};

class Response {
  constructor(res) {
    this.res = res;
  }

  success(payload) {
    return this.res.status(200).json({
      code: 200,
      version: "version 1.0",
      status: "success",
      message: {
        title: "sukses",
        msg: payload.msg || "sukses",
      },
      data: payload.data || null,
    });
  }

  notFound(payload) {
    return this.res.status(404).json({
      code: 404,
      version: "version 1.0",
      status: "fail",
      message: {
        title: "gagal",
        msg: payload.msg || "konten tidak ditemukan",
      },
      data: payload.data || null,
    });
  }

  errorClient(payload) {
    return this.res.status(400).json({
      code: 400,
      version: "version 1.0",
      status: "fail",
      message: {
        title: "gagal",
        msg: payload.msg || "gagal, galat di sisi client",
      },
      data: payload.data || null,
    });
  }

  errorServer(payload) {
    return this.res.status(500).json({
      code: 500,
      version: "version 1.0",
      status: "fail",
      message: {
        title: "gagal",
        msg: payload.msg || "gagal, terjadi kesalahan",
      },
      data: payload.data || null,
    });
  }

  forbidden() {
    return this.res.sendStatus(403);
  }
}

export {
  PasarDana,
  PasarDanaSchema,
  parseStockData,
  Response,
  generateRequestQuery,
};
