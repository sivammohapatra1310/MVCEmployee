import mongoose from 'mongoose';

const uri = "mongodb+srv://sivammohapatra:User2004@cluster0.jlvlmmi.mongodb.net/FinalDataBase?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
