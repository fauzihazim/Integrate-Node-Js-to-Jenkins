import express from 'express';
import { addStudent, deleteStudent, editStudent, getStudents } from './src/controller/listStudent.js';
const port = 3000;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/getStudents", getStudents);
app.post("/addStudent", addStudent);
app.put("/editStudent/:id", editStudent);
app.delete("/deleteStudent/:id", deleteStudent);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});