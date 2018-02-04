export const handleError = (err, h) => {
	const res = h.response()
	if (err.code) {
		if (err.error.indexOf('NOT_FOUND') >= 0) {
			res.statusCode = 404
		}
		else {
			throw new Error(err.error)
		}
	}
	else if (err.error) {
		throw new Error(err.error)
	}
	else {
		throw err
	}
	return res
}
