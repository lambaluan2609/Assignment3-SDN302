import studentModel from "../model/studentModel.js";


//API endpoint for my student code

const myStudentCode = async (req, res) => {

    try {res.status(200).json({
        data: {
            fullName: "Lam Ba Luan",
            studentCode: "QE170169"
        }
    });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

//add student 

const addStudent = async (req, res) => {

    const student = new studentModel({
        name: req.body.name,
        studentCode: req.body.studentCode,
        isActive: req.body.isActive,
    })
    try {
        await student.save();
        res.status(201).json({success: true, message: "Student created successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: "Student created failed"})
    }
}

// all student list
const listStudent = async (req, res) => {
    try {
        const students = await studentModel.find();
        res.status(200).json({success: true, data:students})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error"})
    }
}

// get student by id

const getStudentById = async (req, res) => {
    const { id } = req.params; // Lấy ID từ URL

    try {
        const student = await studentModel.findById(id); // Tìm sinh viên theo ID
        
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({ success: true, data: student }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
//update student

const updateStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                isActive: req.body.isActive,
            },
            { new: true, runValidators: true } // Run validations
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Student update failed" });
    }
};

// remove student 

const removeStudent = async (req, res) => {
    try {
        const { id } = req.params; 
        if (!id) return res.status(400).json({ success: false, message: "Student ID is required" });

        const student = await studentModel.findByIdAndDelete(id);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
    
export {myStudentCode,addStudent, listStudent, removeStudent, updateStudent, getStudentById}