import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { cacheLife } from 'next/cache';
import assetClient from '../api/assetClient';

export const getImageMeta = async (bucketName: string, prefix?: string) => {
  'use cache';
  cacheLife('hours');

  try {
    const allContents = [];
    let continuationToken: string | undefined;

    do {
      const response = await assetClient.send(
        new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        })
      );
      if (response.Contents) {
        allContents.push(...response.Contents);
      }
      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);

    return allContents;
  } catch (error) {
    console.error('Error fetching image metadata:', error);
    return [];
  }
};
