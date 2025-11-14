const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");

router.get("/", controller.getStudents);
router.post("/", controller.addStudent);
router.patch("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
