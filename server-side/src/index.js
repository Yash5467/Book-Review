import {app} from './app.js'
import { connectDB } from './db/DB.js'

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("App is listening at PORT",process.env.PORT);
    })
})