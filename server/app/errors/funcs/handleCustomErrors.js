const handleCustomErrors = (err) => {
    const response = {
        error: 'Something went wrong',
        statusCode: 500,
    };

    switch (err.code) {
        case 1:
            response.error = 'User not found';
            response.statusCode = 404;
            return response;
        case 2:
            response.error = 'Invalid password';
            response.statusCode = 400;
            return response;
        default:
            return response;
    }
};

module.exports = handleCustomErrors;