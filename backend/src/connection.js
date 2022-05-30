const mongoose = require('mongoose');

module.exports = async function Connection(url) {

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await mongoose.connection;
  await db.on('error', console.error.bind(console, 'connection error'));
  await db.once('open', () => {
    //
  })

}