import { Router } from "express";
import { send, setErrorResponseMsg } from "../../../helper/responseHelper.js";
import RESPONSE from "../../../configs/global.js";
import authenticate from "../../../middlewares/authenticate.js";
import categoryModel from "../../../models/categoryModel.js";
import constants from "../../../configs/constants.js";
const router = Router();

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
     //console.log(req.params._id)
    await categoryModel.updateOne({ _id: id }, [
      { $set: { isactive: constants.CONTENT_STATE.NOT_AVTIVE } },
    ]);

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
