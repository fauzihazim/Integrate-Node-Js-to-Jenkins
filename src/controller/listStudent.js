// import { Request, Response } from "express";

let students = [
    { id: 1, name: 'Ali', subject: 'Math', grade: 85 },
    { id: 2, name: 'Budi', subject: 'Science', grade: 92 },
    { id: 3, name: 'Citra', subject: 'History', grade: 78 },
];

export const getStudents = (req, res) => {
    try {
        if (students) {
            res.status(200).json({ status: "success", data: students });
            return;
        }
        res.status(404).json({ status: "failed", message: "Student is not found" });
        return;
    } catch (error) {
        res.status(500).json({ status: "failed", message: "error server" });
        return;
    }
}

export const addStudent = (req, res) => {
    const { name, subject, grade } = req.body;
    const id = students[students.length - 1].id + 1;
    try {
        const newStudent = {id, name, subject, grade};
        students.push(newStudent); // Add the new student object to the list
        res.status(201).json({ status: "success", data: newStudent });
        return;
    } catch (error) {
        res.status(500).json({ status: "failed", message: "error server" });
        return;
    }
}

export const editStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, subject, grade } = req.body;
    try {
        let editedStudent = students.find(obj => obj.id === id);
        if (editedStudent) {
            // Edit Student
            editedStudent.name = name;
            editedStudent.subject = subject;
            editedStudent.grade = grade;
            // Return http status
            res.status(200).json({ status: "success", data: editedStudent });
            return;
        }
        res.status(404).json({ status: "failed", message: "Student is not found" });
        return;
    } catch (error) {
        res.status(500).json({ status: "failed", message: "error server" });
        return;
    }
}

export const deleteStudent = (req, res) => {
    console.log("Delete running");
    
    const id = parseInt(req.params.id);
    console.log("ID student", id);
    
    try {
        // students = students.filter(obj => obj.id !== id);
        let index = students.findIndex(obj => obj.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            console.log("Student ", students);
            res.status(204).end();
            return;
        }
        res.status(404).json({ status: "failed", message: "Student is not found" });
        return;
    } catch (error) {
        res.status(500).json({ status: "failed", message: "error server" });
        return;
    }
}