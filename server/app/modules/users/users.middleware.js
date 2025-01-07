const bcrypt = require('bcryptjs');
const validator = require('express-validator');
const hashPassword = async (req, _, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    next();
};

const validate = (method) => {
    return async (req, res, next) => {
        try {
            let validations = [];
            switch (method) {
                case 'registerUsers':
                    validations = [
                        validator.body('name', 'Name is required').exists().isString(),
                        validator.body('email', 'Email is required').exists().isEmail(),
                        validator.body('password', 'Password is required').exists().isString(),
                        validator.body('avatarUrl', 'Avatar URL is required').exists().isString(),
                    ];
                    break;
                case 'loginUsers':
                    validations = [
                        validator.body('email', 'Email is required').exists().isEmail(),
                        validator.body('password', 'Password is required').exists().isString(),
                    ];
                    break;
            }


            await Promise.all(validations.map(validation => validation.run(req)));


            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
};





module.exports = { hashPassword, validate };