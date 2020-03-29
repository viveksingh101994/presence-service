import { firebaseConfig } from './config';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export class DBConnector {
  static auth: any;
  static firestore: any;
  static initConnection() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }
}
