import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_SECRET,
  region: 'us-east-1', // e.g., us-east-1
});

const s3 = new AWS.S3();

export default s3;
