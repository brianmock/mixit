import { getAuth } from "firebase/auth";

import { app } from './app.js'

const auth = getAuth(app);

export { auth };
