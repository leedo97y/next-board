import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const options = { useUnifiedTopology: true, useNewUrlParser: true };

let client;
let clientPromise = MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise };
