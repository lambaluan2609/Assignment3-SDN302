import express from "express"
import { myStudentCode,addStudent, listStudent, removeStudent, updateStudent, getStudentById } from "../controller/studentController.js"

const studentRouter = express.Router()


studentRouter.get("/info", myStudentCode);
studentRouter.post("/students", addStudent);
studentRouter.get("/students", listStudent);
studentRouter.get("/students/:id", getStudentById);
studentRouter.put("/students/:id", updateStudent);
studentRouter.delete("/students/:id", removeStudent);



export default studentRouter