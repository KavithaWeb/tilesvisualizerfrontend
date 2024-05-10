const express =  require('express');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.static(__dirname + '/public'));

const localhost = 3000;


app.listen(localhost, ()=>{
    console.log(`visit http://localhost:${localhost}/`);
});




