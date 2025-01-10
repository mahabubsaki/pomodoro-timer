const jwt = require('jsonwebtoken');
const verifyJwt = (req, res, next) => {
    const token = req.cookies?.['next-auth.session-token'];
    console.log(token, 'token');
    if (!token) {
        // return res.status(401).send({ status: false, message: 'unauthorized' });
    }
    jwt.verify(token, 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY', (err, decoded) => {
        // if (err) {
        //     return res.status(401).send({ status: false, message: 'unauthorized' });
        // }
        console.log(decoded, 'decoded');
        console.log(err, 'err');
    });

    next();
};
module.exports = verifyJwt;