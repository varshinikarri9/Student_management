const db = require("../db");

// GET all students
exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// ADD student
exports.addStudent = (req, res) => {
  const { name, department, email } = req.body;

  db.query(
    "INSERT INTO students (name, department, email) VALUES (?, ?, ?)",
    [name, department, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Student added successfully", id: result.insertId });
    }
  );
};

// UPDATE student
exports.updateStudent = (req, res) => {
  const id = req.params.id;
  const { name, department, email } = req.body;

  db.query(
    "UPDATE students SET name=?, department=?, email=? WHERE id=?",
    [name, department, email, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Student updated successfully" });
    }
  );
};

// DELETE student
exports.deleteStudent = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM students WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Student deleted successfully" });
  });
};
