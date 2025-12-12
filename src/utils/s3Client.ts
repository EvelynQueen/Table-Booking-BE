import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Create an S3 client that knows how to talk to S3 bucket
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
/*Explaining
1. Region : Where your bucket lives
2. Credentials : AWS access keys from .env (access key of user role)
3. ! : this environment variable will alway exist
*/

// Defines a reusable func that uploads a single object/file to S3
export const putObjectToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
) => {
  const bucket = process.env.AWS_BUCKET_NAME;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  });
  await s3.send(command);

  return {
    key: fileName,
    url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
  };
};

/*Explaining
1. fileBuffer : image data stored in a nodejs buffer
2. fileName : the name you want in S3
3. mimeType : fileType
4. key : the fileName saved inside the bucket
5. url : the full public URL (works only if your bucket or folder is public))
5. body : actual file bytes
6. ContentType : tell S3 what type of file (.jpeg/png/...)
*/
