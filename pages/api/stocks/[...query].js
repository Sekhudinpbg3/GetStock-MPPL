import { PasarDana, PasarDanaSchema, Response } from "../../../utils";

const validate = async (params) => {
  await PasarDanaSchema.validate(params);
  const data = PasarDanaSchema.cast(params);
  return {
    Keywords: data.search,
    pageBegin: data.page,
    pageLength: data.per_page,
    sortField: data.sort_by,
    sortOrder: data.sort_direction.toUpperCase(),
    Index: data.index_id,
    StockSector: data.sector_id,
    StockSubSector: data.subsector_id,
  };
};

const getData = async (params = {}) => {
  const parsedParams = await validate(params);
  try {
    const response = await PasarDana.get("/StockSearchResult/GetAll", {
      params: parsedParams,
    });
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

const handler = async (req, res) => {
  const response = new Response(res);

  const { query, ...newQuery } = req.query;
  const param = query[0];

  if (req.method === "GET") {
    if (param === "search") {
      try {
        const data = await getData(newQuery);

        if (!data) {
          return response.errorServer({});
        }
        return response.success({ data: { length: data.length, data } });
      } catch (error) {
        return response.errorServer({});
      }
    }

    if (param !== "search") {
      try {

        const data = await getData({ search: param });
        if (!data[0] || data.length !== 1) {
          return response.errorServer({});
        }

        if (data[0] && data.length === 1) {
          return response.success({ data: data[0] });
        }
        return response.errorServer({});
      } catch (error) {
        return response.errorServer({});
      }
    }
  }
};

export default handler;
