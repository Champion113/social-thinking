const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-thinking', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

module.exports = mongoose.connection;