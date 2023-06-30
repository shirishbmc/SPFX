const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
var cors = require('cors')

const app = express();
app.use('/images', express.static('images'));
app.use(cors())

app.get('/get_image_link', (req, res) => {
  const link = req.query.link; // Get the link parameter from the query string

  const headers = {
    'Authorization': 'Bearer c5e59588362ef7521a5624942ef705280c171bc7',
    'Content-Type': 'application/json',
  };

  const data = '{ "color": "1133ff", "exclude_bitly_logo": true, "image_format": "svg" }';

  axios.post(`https://api-ssl.bitly.com/v4/bitlinks/link.fidelity.com/${link}/qr`, data, { headers })
    .then(response => {
      const svgData = response.data.qr_code.replace(/^data:image\/svg\+xml;base64,/, '');
      const svgBuffer = Buffer.from(svgData, 'base64');

      sharp(svgBuffer)
        .toFormat('png')
        .toBuffer()
        .then(pngBuffer => {
          const imageLink = saveImage(pngBuffer);
          res.json({ imageLink });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while processing the image.' });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the QR code.' });
    });
});

function saveImage(buffer) {
  const imageFilePath = path.join(__dirname, 'output.png');
  fs.writeFileSync(imageFilePath, buffer);
  return imageFilePath;
}

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});
