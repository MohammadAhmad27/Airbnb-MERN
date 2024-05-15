const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dovnqmjna',
  api_key: '959394489267139',
  api_secret: 'MwBw7cn-oqrgOWZb0VaKyPC7xjY'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'airbnb_DEV',
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext === 'png' || ext === 'jpg' || ext === 'jpeg' ? ext : 'jpg';
    },
    public_id: (req, file) => `listing_${Date.now()}`,
  },
});

module.exports = {
  cloudinary,
  storage
};
