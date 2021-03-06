import { firebaseConfig } from './config';
import * as admin from 'firebase-admin';
import * as stream from 'stream';
import { generateUUID } from '../common';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class FireBase {
  static storage: any;
  static initConnection() {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: firebaseConfig.clientEmail,
        privateKey: firebaseConfig.privatekey,
        projectId: firebaseConfig.projectId
      }),
      storageBucket: firebaseConfig.storageBucket
    });

    this.storage = admin.storage().bucket();
  }

  static uploadPicture({ imgType, base64 }): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!base64) {
        reject(
          'Could not upload picture because at least one param is missing.'
        );
      }
      let bufferStream = new stream.PassThrough();
      bufferStream.end(Buffer.from(base64, 'base64'));
      let bucket = FireBase.storage;
      let file = bucket.file(`/avatars/${generateUUID()}.${imgType}`);
      bufferStream
        .pipe(
          file.createWriteStream({
            metadata: {
              contentType: `image/${imgType}`
            }
          })
        )
        .on('error', (error) => {
          reject(`Error while uploading picture ${JSON.stringify(error)}`);
        })
        .on('finish', (resp) => {
          file.getSignedUrl(
            {
              action: 'read',
              expires: '03-01-2500'
            },
            (error, url) => {
              if (error) {
                reject(error);
              }
              resolve(url);
            }
          );
        });
    });
  }
}
