const joi = require('joi');

const requiredSchema = joi.object({
    username: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().required().min(3).max(10)
})

 // schema options
 const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

class validate {
    validateUserData(req,res,next) {

        if(req.body.username.length<1 || req.body.username.length<1 )    {
            res.json({success: false});
        }

        const { error, value } = requiredSchema.validate(req.body, options);
       
        if (error) {
            // on fail return comma separated errors
          next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            next();
        }
        // const validation = requiredSchema.validate({username:req.body.username, firstname:req.body.firstname,lastname:req.body.lastname,password:req.body.password})
        // console.log(validation)
        // res.send(validation)

    }
}

module.exports= new validate();