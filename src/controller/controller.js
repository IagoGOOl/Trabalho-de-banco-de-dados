const location = require('../model/location');

async function listarOcorrencia(req, res) {
	const policia = await location.findAll();
	res.status(200).send(policia);
}

async function criaOcorrencia(req, res) {
	const titulo = req.body.titulo;
	const tipo = req.body.tipo;
	const data = req.body.data;
	const hora = req.body.hora;
	const cordenada = {
		type: 'Point',
		coordinates: [req.body.lat, req.body.lng],
	};

	const ocorrencia = location.build({
		titulo,
		tipo,
		data,
		hora,
		cordenada,
	});

	ocorrencia
		.save()
		.then(() => {
			res.status(200).send('O ponto foi salvo com sucesso.');
		})
		.catch((error) => {
			res.status(400).send('falha ao salvar.');
			console.log(error);
		});
}

module.exports = { criaOcorrencia, listarOcorrencia };
