import { PasarDana, Response } from "../../../utils";

const handler = async (req, res) => {
  const response = new Response(res);

  if (req.method === "GET") {
    try {
      const indexes = await PasarDana.get("/Stock/GetIndexFilters");

      if (!indexes) {
        return response.errorServer({});
      }
      return response.success({
        data: { length: indexes.data.length, data: indexes.data },
      });
    } catch (error) {
      return response.errorServer({});
    }
  }
};

export default handler;
