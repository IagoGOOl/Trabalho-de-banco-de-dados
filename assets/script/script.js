let map;
let marker;

let center = { lat: -6.888463202449027, lng: -38.558930105104125 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14
  });

  marker = new google.maps.Marker({
    map: map,
    position: center,
    draggable: true,
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener("position_changed", () => {
    map.setCenter(marker.position);
  });
}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

function salvar() {
  let select = document.getElementById("tipo");
  const tipo = select.options[select.selectedIndex].value;
  const obj = {
    titulo: document.getElementById("titulo").value,
    tipo: tipo,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng(),
  };

  fetch("http://localhost:3000/ocorrencia", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      alert("Salvo com sucesso");
    })
    .catch((error) => alert("Falha ao salvar!"));
}

function lista() {
  fetch("http://localhost:3000/resgata")
    .then((res) => res.json())
    .then((listObjs) => {
      listObjs.forEach((objMarker) => {
        if (objMarker.cordenada) {
          const marker = new google.maps.Marker({ map: map, label: objMarker.titulo });
          marker.setPosition(
            new google.maps.LatLng(
              objMarker.cordenada.coordinates[0],
              objMarker.cordenada.coordinates[1]
            )
          );
          marker.addListener('click', function() {
            const modal = document.querySelector("#modalLerOcorrencia");
            modal.style.display = "block";

            modal.querySelector("#dados-titulo").textContent = objMarker.titulo
            modal.querySelector("#dados-tipo").textContent = objMarker.tipo
            modal.querySelector("#dados-data").textContent = objMarker.data
            modal.querySelector("#dados-hora").textContent = objMarker.hora

            // alert(`
            //   Titulo: "${objMarker.titulo}"
            //   Tipo: "${objMarker.tipo}"
            //   Data: "${objMarker.data}"
            //   Hora: "${objMarker.hora}"
            // `)
          })
        }
      });
    });
}

function showModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.style.opacity=1
  modal.style.display = "block";
}

function closeModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.style.display = "none";
}