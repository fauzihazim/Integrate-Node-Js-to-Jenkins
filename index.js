import express from 'express';
import { addStudent, deleteStudent, editStudent, getStudents } from './src/controller/listStudent.js';
const port = 3000;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({ status: "success" });
});
// if (process.env.NODE_ENV !== 'test') {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// };

app.get("/getStudents", getStudents);
app.post("/addStudent", addStudent);
app.put("/editStudent/:id", editStudent);
app.delete("/deleteStudent/:id", deleteStudent);

app.listen(port, '203.194.114.176', () => {
    console.log(`Server is running at http://localhost:${port}`);
});