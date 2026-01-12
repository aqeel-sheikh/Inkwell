import createApp from "./app.js";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = createApp()

app.listen(PORT, (err: unknown) =>{
    if(err) console.error("Can't start the sever", err)

    console.log(`Server is listening at http://localhost:${PORT}`)
})