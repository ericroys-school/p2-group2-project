
export const responseError = (res, err) => {
    res.status(500).json({error: "Unable to process request", message: err})
}

export const responseNotFound = (res, id) => {
    res.status(404).json({error: "Unable to find the item requested", message: `${id ? id : ""} Not Found`})
}