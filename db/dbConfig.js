const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://127.0.0.1:27017/fleetizen-api",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
        if(!error) console.log("MongoDB connected");
        else console.log("Connection error : " + error);
    }
);