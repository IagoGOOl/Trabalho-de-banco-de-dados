let map;
let marker;

let center = { lat: -6.888463202449027, lng: -38.558930105104125 };

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 14,
	});

	marker = new google.maps.Marker({
		map: map,
		position: center,
		draggable: true,
	});

	map.addListener('click', (evt) => {
		addMarker(evt);
	});

	marker.addListener('position_changed', () => {
		map.setCenter(marker.position);
	});
}

function addMarker(evt) {
	marker.setPosition(evt.latLng);
}

function salvar() {
	let select = document.getElementById('tipo');
	const tipo = select.options[select.selectedIndex].value;
	const obj = {
		titulo: document.getElementById('titulo').value,
		tipo: tipo,
		data: document.getElementById('data').value,
		hora: document.getElementById('hora').value,
		lat: marker.getPosition().lat(),
		lng: marker.getPosition().lng(),
	};

	fetch('http://localhost:3000/ocorrencia', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj),
	})
		.then((response) => {
			alert('Salvo com sucesso');
		})
		.catch((error) => alert('Falha ao salvar!'));
}

function lista() {
	fetch('http://localhost:3000/resgata')
		.then((res) => res.json())
		.then((ponto) => {
			marker = new google.maps.Marker({ map: map });
			ponto.forEach((location) => {
				if (location.geometria) {
					marker.setPosition(
						new google.maps.LatLng(
							location.geometria.coordinates[0],
							location.geometria.coordinates[1]
						)
					);
				}
			});
		});
}
