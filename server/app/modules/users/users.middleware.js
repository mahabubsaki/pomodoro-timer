const bcrypt = require('bcryptjs');
const hashPassword = async (req, _, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    next();
};

module.exports = hashPassword;