const mongoose = require('mongoose');

const uri = "mongodb+srv://adminchat:chtjsmgdb1000@cluster0.osjde.mongodb.net/Chat?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('db connected in Cluster0'))
  .catch(err => console.log('db connected error in Cluster0: ', err));


/*mongoose.connect('mongodb://localhost/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));*/

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adminchat:chtjsmgdb1000@cluster0.osjde.mongodb.net/Chat?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.then(() => console.log('db connected in cluster'));
client.connect(err => {
  console.log('client.connect: ', err);
  client.close();
});*/
