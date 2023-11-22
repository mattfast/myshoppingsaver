import { loadStripe } from '@stripe/stripe-js';
import s3 from "./s3";

let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "");
  }
  return stripePromise;
};

export const makeCookie = (len: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < len) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const convertTimestampToDateStr = (timestampStr: string) => {
  // Create a new Date object from the timestamp string
  let date = new Date(timestampStr);

  // Define an array of month names
  const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
  ];

  // Extract the year, month, and day from the date
  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];
  let day = date.getDate();

  // Format and return the date string
  return `${month} ${day}, ${year}`;
}

export const s3_url = (user_id: string) => {
  return `https://seller-images-milk.s3.amazonaws.com/upload-${user_id}.png`;
};

export const validateCookie = async (cookie: string | null | undefined) => {

  if (!cookie) return false;

  const response = await fetch(
    `${process.env.REACT_APP_BE_URL}/validate-cookie`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "cookie": cookie
      })
    }
  );

  try {
    const respJson = await response.json();
    if (response.status !== 200) return "";
  
    return respJson["user_id"];
  } catch (e) {
    return "";
  }
}

export const uploadToS3 = async (file: any, setFileType: any, userId: string) => {
  // Create a new image element and set its source to the captured image.
  // Define the S3 bucket name and file name
  const bucketName = 'seller-images-milk';

  // Encode the image as a buffer
  console.log("IMAGE TYPE");
  console.log(file.type);
  const fileType = (file.type?.toLowerCase() || "") as string;
  let fileSuffix = fileType.includes("png")
    ? "png"
    : fileType.includes("jpeg")
    ? "jpeg"
    : fileType.includes("jpg")
    ? "jpg"
    : undefined;
  
  if (!fileSuffix) return false;

  setFileType(fileSuffix);
  const fileName = `upload-${userId}.${fileSuffix}`; // Unique file name

  //const imageBlob = await fetch(capturedImage || "").then((response) => response.blob());

  // Set up the parameters for the S3 upload
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: file.type, // Adjust the content type as needed
  };

  // Upload the image to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading image to S3:', err);
      return false;
    } else {
      console.log('Image uploaded successfully:', data.Location);
      return true;
      // You can handle success here, such as displaying a success message to the user.
    }
  });
}

export const difference = (date: Date) =>{
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const hours = Math.floor(diffInMins / 60);
  const secs = diffInSecs % 60;
  const mins = diffInMins % 60;

  return { hours, mins, secs }
}
