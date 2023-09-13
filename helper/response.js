class ResponseHelper {
  static sendResponse(res, data, message, code) {
    return res.status(code).json({ message, data });
  }
}

export default ResponseHelper;
