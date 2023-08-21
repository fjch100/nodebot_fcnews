import * as fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq3iPo1JMfgqwvJpwK-5qDI6sK16-c-Dk",
  authDomain: "fcnews-33a3b.firebaseapp.com",
  projectId: "fcnews-33a3b",
  storageBucket: "fcnews-33a3b.appspot.com",
  messagingSenderId: "1039974117962",
  appId: "1:1039974117962:web:c1cc72c85bbd7e214f6cb3",
  measurementId: "G-4YX1ERJ3NE",
};

const headlinesId = "headlineNewsId";
const businessId = "businessNewsId";
const technologyId = "technologyNewsId";
const scienceId = "scienceNewsId";
const entertainmentId = "entertainmentNewsId";
const healthId = "healthNewsId";
const SportsId = "SportsNewsId";

const newsColecctions = [
  {
    category: "Headlines",
    colecctiondb: "Headlines",
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: headlinesId,
  },
  {
    category: "Business",
    colecctiondb: "Business",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=Business&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: businessId,
  },
  {
    category: "Technology",
    colecctiondb: "Technology",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=Technology&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: technologyId,
  },
  {
    category: "Science",
    colecctiondb: "Science",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=Science&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: scienceId,
  },
  {
    category: "Entertainment",
    colecctiondb: "Entertainment",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=Entertainment&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: entertainmentId,
  },
  {
    category: "Health",
    colecctiondb: "Health",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=Health&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: healthId,
  },
  {
    category: "Sports",
    colecctiondb: "Sports",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=Sports&apiKey=16c97751c4254e3eb593aa7a7975a3b2`,
    id: SportsId,
  },
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Sing-in to FIrebase
const singIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, "fjch100@yahoo.com", "123456");
    // console.log('userCredential', userCredential);
    // console.log("current user:", auth?.currentUser?.email);
  } catch (err) {
    console.log(err);
  }
};

//Sign-out to Firebase
const signoutHandler = async () => {
  await signOut(auth)
    .then()
    .catch((err) => console.log(err));
};

//function to log events to file
const logtofile = (logText, addDate = true) => {
  let fecha = new Date().toString();
  let texto;
  if (addDate) {
    texto = fecha + logText + "\n";
  } else {
    texto = logText + "\n";
  }
  fs.appendFile("./fcnews_log.txt", texto, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// function to update a firebase collection
const updateDataDb = async (Colection, elementId, data) => {
  try {
    await setDoc(doc(db, Colection, elementId), data);
    logtofile(`Updated Category: ${Colection} ... OK`, false);
  } catch (err) {
    console.log(err);
  }
};

//function to fetch news from API
const getNews = async (url, id) => {
  try {
    const data = await fetch(url);
    const apiData = await data.json();
    const news = {
      _id: id,
      articles: apiData.articles,
      updatedAt: new Date(),
    };
    return news;
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
};

// Main function to run and orchestration the Bot
async function run() {
  logtofile("******************* Updating news **********************", false);
  logtofile(" ", true);
  await singIn();

  for (let index = 0; index < newsColecctions.length; index++) {
    const item = newsColecctions[index];
    const news = await getNews(item.url, item.id);
    // console.log(news);
    await updateDataDb(item.colecctiondb, item.id, news);
  }

  await signoutHandler();

  console.log("DONE !");
  logtofile("------ Done ! -------", false);
}

// run Main fuction
run().catch(console.dir);
