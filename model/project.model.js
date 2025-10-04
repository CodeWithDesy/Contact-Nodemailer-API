import mongoose from'mongoose'

const {Schema} = mongoose;

const projectSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    link: { type: String, required: true},
    image: { type: String},
 }, {timestamps: true})

 const Project = mongoose.model("Project", projectSchema)

 export default {Project}
