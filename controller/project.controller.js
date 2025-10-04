import Project from'../model/project.model.js'

async function createProject(req, res) {
    try {
       const project = new Project(req.body)
       await project.save() 
       res.status(200).json({message: 'Project added successfully', data: project})
    } catch (error) {
       console.log(error)
        res.status(500).json({message: 'server error'}) 
    }
}

async function fetchProject(req, res) {
    try {
        const projects = await Project.find({})
        res.status(200).json({message: 'Projects fetched successfully', data: projects})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

async function deleteProject(req, res) {
   try {
    const projectId = req.params.id
    const project = await Project.findByIdAndDelete(projectId)
    res.status(200).json({message: 'Project deleted successfully', data: project})
   } catch (error) {
    console.log(error)
    res.status(500).json({message: 'server error'})
   } 
}

const basePath = (req, res) => {
    try {
        res.status(400).json({message: 'welcome to api'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

const falsePath = (req, res) => {
    try {
    res.status(400).json({message: 'undefined route'})
} catch (error) {
    console.log(error)
    res.status(500).json({message: 'server error'})
}
}

export {basePath, falsePath, createProject, fetchProject, deleteProject}