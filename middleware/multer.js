const multer = require("multer");

//./media cuz it starts from app.js the main file of the project
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage, //this is equal to storage: storage,
});

module.exports = upload;
