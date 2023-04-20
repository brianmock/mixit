import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { app } from './app';


const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db }
