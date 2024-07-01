import multer from "multer";
//upload the file into backend
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})