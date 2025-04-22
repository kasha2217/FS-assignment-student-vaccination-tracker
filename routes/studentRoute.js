const express = require('express');
const { getAllStudents, createStudent, getStudentByID, editStudent, deleteStudent, studentBulkImport } = require('../controllers/studentController');
const studentRouter = express.Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', createStudent);
studentRouter.get('/:id',getStudentByID);
studentRouter.put('/:id',editStudent);
studentRouter.delete('/:id',deleteStudent)
studentRouter.post('/studentBulkImport',studentBulkImport)

module.exports = studentRouter;
