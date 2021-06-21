import requestsModel from "../../models/requests.model";

async function requestMoney(req, res) {
  if (!req.body.amount || req.body.amount < 1)
    return res.json({
      message: "you must enter the amount you have purchased",
      success: false,
      data: null,
    });

  if (!req.body.proof || req.body.proof.length <= 0)
    return res.json({
      message: "you must include some proof",
      success: false,
      data: null,
    });

  if (!req.body.transactionHash) {
    return res.json({
      message: "you must enter the transaction hash",
      success: false,
      data: null,
    });
  }

  try {
    const result = await requestsModel.newRequest({
      requestedBy: req.session.uid,
      ...req.body,
    });
    return res.json({
      message: "your request has been received",
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: `${
        err.code === 11000
          ? "your request has already been received"
          : "something went wrong"
      }`,
      success: false,
      data: null,
    });
  }
}

export default requestMoney;
