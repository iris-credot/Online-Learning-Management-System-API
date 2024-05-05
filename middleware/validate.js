const Joi = require('joi');

// Define the schema
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profile: Joi.object({
        names: Joi.string().allow(''),
        bio: Joi.string().allow(''),
        avatar: Joi.string().allow('')
    }),
    username: Joi.string().required(),
    role: Joi.string().optional().default('student').invalid('Please do not provide the role.')
}).options({ allowUnknown: true });

// Middleware function to validate request bodies using Joi schema
const validateRequest = (req, res, next) => {
    // Get the request body data
    const data = req.body;

    // Remove the 'role' property from the data
    delete data.role;

    // Validate the modified data against the schema
    const { error, value } = schema.validate(data, { stripUnknown: true });

    // Check if there's an error
    if (error) {
        console.error("Validation error:", error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    } else {
        // Add the default 'role' to the validated data
        value.role = 'student';
        req.validatedData = value;
        next();
    }
};

module.exports = validateRequest;
