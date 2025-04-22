const studentModel = require("../models/student");
const fs = require("fs");
const csv = require("csv-parser");

const getAllStudents = async (req, res) => {
  const students = await studentModel.find();
  res.json(students);
};

const createStudent = async (req, res) => {
  const student = new studentModel(req.body);
  await student.save();
  res.status(201).json(student);
};

const getStudentByID = async (req, res) => {
  const student = await studentModel.findById(req.params.id);
  try {
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error!" });
  }
};

const editStudent = async (req, res) => {
  try {
    const updateStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.params.body,
      { new: true, runValidators: true }
    );
    if (!updateStudent) {
      return res.status(404).json({ message: "Student not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deletStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletStudent) {
      return res.status(404).json({ message: "Student not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Sever error" });
  }
};

const studentBulkImport = async (req, res) => {
  const results = [];

  try {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          await studentModel.insertMany(results);
          fs.unlinkSync(req.file.path); // Clean up uploaded file
          res
            .status(201)
            .json({
              message: "Students imported successfully",
              count: results.length,
            });
        } catch (err) {
          res
            .status(500)
            .json({ message: "Failed to import students", error: err.message });
        }
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing file", error: err.message });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentByID,
  editStudent,
  deleteStudent,
  studentBulkImport
};
