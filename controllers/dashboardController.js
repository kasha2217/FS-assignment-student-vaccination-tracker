const Student = require("../models/student");
const Drive = require("../models/VaccinationDrive");

const getDashboardOverview = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const vaccinatedStudents = await Student.countDocuments({
      "Vaccination Status": "vaccinated",
    });

    const vaccinationRate =
      totalStudents > 0
        ? ((vaccinatedStudents / totalStudents) * 100).toFixed(2) + "%"
        : "0%";

    //   const today = new Date();
    //   const in30Days = new Date();
    //   in30Days.setDate(today.getDate() + 30);

    //   const upcomingDrives = await Drive.find({
    //     date: { $gte: today, $lte: in30Days }
    //   })
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day

    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);
    in30Days.setHours(23, 59, 59, 999); // End of the day

    const upcomingDrives = await Drive.find({
      date: { $gte: today, $lte: in30Days },
    });

    res.json({
      totalStudents,
      vaccinatedStudents,
      vaccinationRate,
      upcomingDrives,
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getDashboardOverview;
