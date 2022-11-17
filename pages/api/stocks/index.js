import { PasarDana, Response } from "../../../utils";

const handler = async (req, res) => {
  const response = new Response(res);

  if (req.method === "GET") {
    try {
      const stocks = await PasarDana.get("/StockSearchResult/GetAll");

      if (!stocks) {
        return response.errorServer({});
      }
      const { data } = stocks;
      return response.success({ data: { length: data.length, data } });
    } catch (error) {
      return response.errorServer({});
    }
  }
};

export default handler;
