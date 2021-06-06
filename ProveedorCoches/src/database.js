const mongoose = require('mongoose');

mongoose.connect('mongodb://Localhost/ProveedorCoches', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then((db) => console.log("DB is connected."))
    .catch((err) => console.log(err));