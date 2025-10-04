import Joi from'joi'

const contactSchema = Joi.object({
    name: Joi.string().required(), 
    email: Joi.string().required('email is required'),
    message: Joi.string().required(),
})

const validateContactMiddleware = (req, res, next) => {
    try {
        let {error, value} = contactSchema.validate(req.body)
        if (error) {
            res.status(400).json({message:error.details[0].message})
        } else {
            next()
        }
    } catch (error) {
       console.log(error)
       res.status(500).json({message: 'server error'}) 
    }
}

export default {validateContactMiddleware}