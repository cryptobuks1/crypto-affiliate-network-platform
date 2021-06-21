import requestsModel from "../../models/requests.model";

async function getRequestsController(req, res) {
  try {
    const requests = await requestsModel.findRequests({});
    return res.json({
      message: `found ${requests.length} requests`,
      success: true,
      data: requests,
    });
  } catch (err) {
    return res.json({
      message: "something went wrong",
      success: false,
      data: null,
    });
  }
}

export default getRequestsController;
