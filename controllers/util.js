
export const responseError = (res, err) => {
    res.status(500).json({error: "Unable to process request", message: err})
}

export const responseNotFound = (res, id) => {
    res.status(404).json({error: "Unable to find the item requested", message: `${id ? id : ""} Not Found`})
}

export const responseUserError = (res, err) => {
    res.status(400).json({error: err, message: err})
}

export const responseUnauthorized = (res) => {
    res.status(401).json({error: "Unable to validate credentials", message: "Bad credentials or access to resource is forbidden"})
}

export const responseLogin = (req, res, next) => {
    !req.session.isLoggedIn ? res.redirect('/login') : next()
}