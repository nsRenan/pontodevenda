
const { S3Client} = require('@aws-sdk/client-s3');
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT_S3,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
})


module.exports = s3
