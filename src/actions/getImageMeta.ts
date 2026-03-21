import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import assetClient from '../api/assetClient';

export const getImageMeta = async (bucketName: string) => {
  try {
    const { Contents } = await assetClient.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
      })
    );
    return Contents;
  } catch (error) {
    console.error('Error fetching image metadata:', error);
    return [];
  }
};
