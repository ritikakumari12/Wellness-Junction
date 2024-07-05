//Route for using CLoudinary Uploader
//Cloudinary: Cloudinary's Node.js provides image and video upload, transformation, optimization, and delivery capabilities
const router = require('express').Router();
//Requiring Cloudinary Library
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
//fs -> Nodejs file system module allows you to work with file system on your computer
const fs = require('fs');

//Uploading images on Cloudinary
//Setting configuration parameters
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Uploads an image file to Cloudinary
//After sending post request, File will be uploaded in tmp folder instead of RAM then in cloudinary
router.post('/upload', auth, authAdmin, (req, res) => {
  try {
    //When you upload a file, the file will be accessible from req.files.
    // console.log(req.files);
    //Object.keys() return array
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send('No files were uploaded.');

    const file = req.files.file;
    //Checking File size
    //1024*1024 = 1mb
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File size is too large to upload' });
    }

    //Checking file format
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Invalid file format' });
    }

    //Uploading image to Cloudinary
    cloudinary.v2.uploader.upload(
      //imagePath -> file.tempFilePath: ..\\server\\tmp\\
      file.tempFilePath,
      { folder: 'test' },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        //Every image has unique public id and url
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
// auth, authAdmin,
//Delete image file from Cloudinary
router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) res.status(400).json({ msg: 'No image selected' });

    //permanantly delete single image with public_id
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: 'Deleted Image' });
    });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
});

//Function to remove file from tmp folder
const removeTmp = (path) => {
  //fs.unlink deletes the specified file
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;