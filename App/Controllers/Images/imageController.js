
const fs = require('fs');
const path = require('path');

exports.GetImage = (req, res) => {
 const { id } = req.params;
 const filePathPng = path.join(__dirname, '../../../images', `${id}.png`);
 const filePathJpg = path.join(__dirname, '../../../images', `${id}.jpg`);
 let fileExtension;

 try {
    fs.accessSync(filePathPng, fs.constants.F_OK);
    fileExtension = '.png';
  } catch (err) {
    try {
      fs.accessSync(filePathJpg, fs.constants.F_OK);
      fileExtension = '.jpg';
    } catch (err) {
      res.status(404).send({ error: 'Image not found' });
      return;
    }
  }
 
  const filePath = path.join(__dirname, '../../../images', `${id}${fileExtension}`);
  res.sendFile(filePath);
}