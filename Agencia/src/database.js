const mongoose = require('mongoose');


mongoose.connect('mongodb://Localhost/Agencia', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((db) => console.log("DB is connected."))
    .catch((err) => console.log(err));