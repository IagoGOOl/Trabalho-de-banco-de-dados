const location = require('./model/location');
const controller = require('./controller/controller');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());
app.use(cors());

async function syncModel() {
	await location.sync();
}

syncModel();

app.post('/ocorrencia', controller);
app.get('/resgata', controller);

app.listen(3000, () => {
	console.log('Server On');
});
