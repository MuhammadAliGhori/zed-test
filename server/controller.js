// updatedController.js
const UpdatedData = require("./model");
const multer = require("multer");

// upload middleware
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage }).array("file", 10);

// create data
exports.storeData = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }

      const { name, age, gender, architecture, profession, agreeToTerms } =
        req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Please upload a file" });
      }

      const filePaths = req.files.map((file) => file.path);

      const newData = new UpdatedData({
        name,
        age,
        gender,
        architecture,
        profession,
        agreeToTerms,
        file: filePaths,
      });

      await newData.save();
      console.log(newData, "data");
      res.status(201).json(newData);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// edit data
exports.editData = async (req, res) => {
  try {
    const { name, age, gender, architecture, profession, agreeToTerms } =
      req.body;
    const userId = req.params.id;
    const updatedData = await UpdatedData.findOneAndUpdate(
      { _id: userId },
      { name, age, gender, architecture, profession, agreeToTerms },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const allData = await UpdatedData.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get data
exports.getData = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await UpdatedData.findById(userId);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete data
exports.deleteData = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedData = await UpdatedData.findByIdAndDelete(userId);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
