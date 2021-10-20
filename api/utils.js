exports.sendResponse = (response, { status, json }) => {
    return response.status(status).json(json).end();
}
