const mongoose = require('mongoose');
mongoose.connect(process.env['URIMONGODB'], {
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

