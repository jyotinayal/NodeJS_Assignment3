const joi = require('joi');

const requiredRegisterSchema = joi.object({
    username: joi.string().email().required().min(3).max(25),
    firstname: joi.string().required().min(2),
    lastname: joi.string().required().min(2),
    password: joi.string().required().min(3).max(15)
})

const requiredLoginSchema = joi.object({
    username: joi.string().required().min(3).max(25),
    password: joi.string().required().min(3).max(15)
})

 const options = {
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: true 
};

class validate {
    validateRegUserData(req,res,next) {
        const { error, value } = requiredRegisterSchema.validate(req.body, options);
        if (error) {
            const err_data = error.details.map(x => x.message).join(', ');
            res.json({data : err_data});
        } else {
            req.body = value;
            next();
        }
    }
    validateLoginUserData(req,res,next) {
        const { error, value } = requiredLoginSchema.validate(req.body, options);
        if (error) {
            const err_data = error.details.map(x => x.message).join(', ');
            res.json({data : err_data , error : 'Fill All Details' });
        } else {
            req.body = value;
            next();
        }
    }
}

module.exports= new validate();