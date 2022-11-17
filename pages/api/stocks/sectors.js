import { PasarDana, Response } from "../../../utils";

const getSubsectors = async (sectorId) => {
  const response = await PasarDana.get(
    "/StockSubSector/GetSubSectorFromSector",
    {
      params: { sectorId },
    }
  );
  return response.data;
};

const handler = async (req, res) => {
  const response = new Response(res);
  try {
    const result = await PasarDana.get("/StockSector/GetAll");

    const subSectors = await Promise.all(
      result.data.map((i) => getSubsectors(i.Id))
    );

    const data = result.data.map((sector, idx) => ({
      id: sector.Id,
      name: sector.Name,
      stocks_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/stocks/search?sector_id=${sector.Id}`,
      subsectors: subSectors[idx].map((subsector) => ({
        id: subsector.Id,
        name: subsector.Name,
        stocks_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/stocks/search?subsector_id=${subsector.Id}`,
      })),
    }));

    if (!data) {
      return response.errorServer({});
    }
    return response.success({ data: { length: data.length, data } });
  } catch (error) {
    return response.errorServer({});
  }
};

export default handler;
