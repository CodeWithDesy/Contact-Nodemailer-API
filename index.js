console.log("Loaded EMAIL_USER:", process.env.EMAIL_USER);
console.log("Loaded EMAIL_PASS:", process.env.EMAIL_PASS);

import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config()

console.log('=== ENVIRONMENT VARIABLES CHECK ===');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('MONGO_URI length:', process.env.MONGO_URI?.length);
console.log('MONGO_URI starts with:', process.env.MONGO_URI?.substring(0, 20));
console.log('===================================');

import { basePath, falsePath, createProject, fetchProject, deleteProject } from'./controller/project.controller.js'
import User from'./model/user.model.js'
import validateLoginMiddleware from'./middeware/auth.validator.js'
import { loginUser } from'./controller/user.controller.js'
import { sendMessage, fetchMesaage } from'./controller/contact.controller.js'
const api = express()
api.use(express.json())
api.use(express.urlencoded({extended:true}))

const PORT = 1212

api.use(cors({
    origin: 'https://codewithdesy.netlify.app',
    methods: ['POST', 'GET'],
    credentials: true
}));

api.post('/project', createProject)
api.get('/projects', fetchProject)
api.post('/project/:id', deleteProject)
api.post('/login', loginUser)
api.post('/message', sendMessage)
api.get('/messages', fetchMesaage)
// ✅ Test route
api.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

api.all('/', basePath)
api.use((req, res) => {
    falsePath(req, res)
})

api.listen(PORT, async () => {
  console.log(`Server live on: ${PORT}`);
  // Use Atlas URI if available (Render), otherwise use localhost (local dev)
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/contactForm';
  
  console.log('Connecting to:', MONGO_URI.includes('mongodb.net') ? 'MongoDB Atlas' : 'Local MongoDB');
  
  await mongoose.connect(MONGO_URI);
  console.log("Database connected");
});



