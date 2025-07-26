import { MongoClient } from "mongodb";

let client;

try{
    if(!process.env.MONGODB_URI){
        throw new Error("MONGODB URI is required!")
    }

    client=new MongoClient(process.env.MONGODB_URI);
    client.connect();

}catch(e){
    console.log(e);
}

export default client;