import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {CreateContestsProps} from '../shared/types/contest.types';

class Contests {
  static collectionNameContests = 'contests';

  static async createContests(payload: CreateContestsProps) {
    const changePayload = {
      ...payload,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    try {
      const response = await firestore()
        .collection(Contests.collectionNameContests)
        .add(changePayload);
      if (response.id) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      throw Error(error);
    }
  }

  static async getContests() {
    try {
      const response = await firestore()
        .collection(Contests.collectionNameContests)
        .where('platform', '==', 'Pubg')
        .get();
      return response;
    } catch (error) {}
  }
}

export default Contests;
