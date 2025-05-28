import express from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running on" + PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);