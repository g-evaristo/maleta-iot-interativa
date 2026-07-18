const compartments = [
  { id: 1, title: "Conexões e resistores", description: "Itens básicos para montagem e ligação dos circuitos.", components: [
    { name: "Jumpers (macho - macho)", category: "Conexão" },
    { name: "Cabo de conexão Arduino", category: "Alimentação e dados" },
    { name: "Resistores", category: "Eletrônica" }
  ]},
  { id: 2, title: "Prototipagem e identificação", description: "Placas e acessórios principais para prototipagem.", components: [
    { name: "Módulo RFID", category: "Identificação" },
    { name: "Jumpers (macho -fêmea)", category: "Conexão" },
    { name: "Arduino Mega 2560", category: "Microcontrolador" },
    { name: "Protoboard", category: "Prototipagem" }
  ]},
  { id: 3, title: "Controles e sinalização", description: "Componentes para entradas manuais e sinalização sonora.", components: [
    { name: "Potenciômetros", category: "Entrada" },
    { name: "Buzzer", category: "Atuador" },
    { name: "Botões", category: "Entrada" }
  ]},
  { id: 4, title: "LEDs", description: "Conjunto de LEDs para sinalização visual.", components: [
    { name: "4 LEDs vermelhos", category: "Atuador" },
    { name: "4 LEDs verdes", category: "Atuador" },
    { name: "4 LEDs amarelos", category: "Atuador" }
  ]},
  { id: 5, title: "Localização", description: "Módulo usado para obtenção de coordenadas geográficas.", components: [
    { name: "Módulo GPS", category: "Comunicação e localização" }
  ]},
  { id: 6, title: "Capacitores", description: "Componentes passivos para filtragem, temporização e armazenamento de carga.", components: [
    { name: "Capacitores", category: "Eletrônica" }
  ]},
  { id: 7, title: "ESP32", description: "Placa microcontroladora com conectividade Wi-Fi e Bluetooth.", components: [
    { name: "ESP32", category: "Microcontrolador" }
  ]},
  { id: 8, title: "Acionamento elétrico", description: "Módulo destinado ao controle de cargas externas.", components: [
    { name: "Módulo relé", category: "Atuador" }
  ]},
  { id: 9, title: "Movimento", description: "Atuadores utilizados para movimento rotacional e posicionamento.", components: [
    { name: "Motor", category: "Atuador" },
    { name: "Servomotor", category: "Atuador" }
  ]},
  { id: 10, title: "Cor e luminosidade", description: "Sensores ópticos para identificar cores e intensidade de luz.", components: [
    { name: "Sensor de cores", category: "Sensor óptico" },
    { name: "Sensor de luminosidade", category: "Sensor óptico" }
  ]},
  { id: 11, title: "Visão embarcada", description: "Módulo ESP com câmera integrada.", components: [
    { name: "ESP-CAM", category: "Microcontrolador e câmera" }
  ]},
  { id: 12, title: "Distância", description: "Sensor ultrassônico para medição de distância.", components: [
    { name: "HC-SR04", category: "Sensor de distância" }
  ]},
  { id: 13, title: "Temperatura e umidade", description: "Sensor digital para condições ambientais.", components: [
    { name: "DHT11", category: "Sensor ambiental" }
  ]},
  { id: 14, title: "Umidade do solo", description: "Sensor usado para verificar a umidade presente no solo.", components: [
    { name: "Sensor de umidade do solo", category: "Sensor ambiental" }
  ]},
  { id: 15, title: "Batimentos cardíacos", description: "Sensor óptico para leitura de pulso e frequência cardíaca.", components: [
    { name: "Sensor de batimentos cardíacos", category: "Sensor biométrico" }
  ]},
  { id: 16, title: "Detecção de chuva", description: "Sensor usado para detectar gotas e presença de água.", components: [
    { name: "Sensor de chuva", category: "Sensor ambiental" }
  ]}
];

const hotspotPositions = {
  1: [3.7, 14.3, 28.0, 35.5],
  2: [33.0, 12.6, 61.2, 23.2],
  3: [3.7, 51.9, 13.5, 16.8],
  4: [18.2, 51.9, 13.5, 16.8],
  5: [4.8, 71.2, 12.7, 17.2],
  6: [18.9, 71.2, 12.8, 16.7],
  7: [33.4, 38.9, 11.3, 21.2],
  8: [46.0, 38.1, 11.5, 22.3],
  9: [59.1, 37.1, 11.8, 23.5],
  10: [71.9, 38.6, 11.3, 21.3],
  11: [85.1, 37.0, 10.5, 24.2],
  12: [34.2, 64.1, 10.9, 21.7],
  13: [46.1, 62.6, 12.6, 23.9],
  14: [59.5, 62.6, 10.7, 22.1],
  15: [72.3, 62.3, 11.0, 22.2],
  16: [84.7, 61.5, 12.2, 23.7]
};

const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const componentList = document.getElementById("componentList");
const inventoryBody = document.getElementById("inventoryBody");
const searchInput = document.getElementById("searchInput");
const viewToggle = document.getElementById("viewToggle");
const vectorView = document.getElementById("vectorView");
const photoView = document.getElementById("photoView");
const photoHotspots = document.getElementById("photoHotspots");

function selectCompartment(id) {
  const compartment = compartments.find(item => item.id === Number(id));
  if (!compartment) return;
  document.querySelectorAll(".compartment, .photo-hotspot").forEach(element => {
    element.classList.toggle("selected", Number(element.dataset.id) === compartment.id);
  });
  detailTitle.textContent = `Compartimento ${compartment.id}: ${compartment.title}`;
  detailDescription.textContent = compartment.description;
  componentList.innerHTML = compartment.components.map(component => `<li>${component.name}</li>`).join("");
}

function renderTable(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const rows = compartments.flatMap(compartment => compartment.components.map(component => ({ id: compartment.id, name: component.name, category: component.category }))).filter(item => !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery) || item.category.toLowerCase().includes(normalizedQuery) || String(item.id).includes(normalizedQuery));
  inventoryBody.innerHTML = rows.map(item => `<tr data-id="${item.id}"><td><span class="compartment-pill">${item.id}</span></td><td>${item.name}</td><td>${item.category}</td></tr>`).join("");
  inventoryBody.querySelectorAll("tr").forEach(row => row.addEventListener("click", () => {
    selectCompartment(row.dataset.id);
    document.querySelector(".workspace").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

function createPhotoHotspots() {
  Object.entries(hotspotPositions).forEach(([id, position]) => {
    const [left, top, width, height] = position;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-hotspot";
    button.dataset.id = id;
    button.setAttribute("aria-label", `Compartimento ${id}`);
    button.style.left = `${left}%`;
    button.style.top = `${top}%`;
    button.style.width = `${width}%`;
    button.style.height = `${height}%`;
    button.innerHTML = `<span>${id}</span>`;
    button.addEventListener("click", () => selectCompartment(id));
    photoHotspots.appendChild(button);
  });
}

document.querySelectorAll(".compartment").forEach(element => {
  element.setAttribute("aria-label", `Compartimento ${element.dataset.id}`);
  const activate = () => selectCompartment(element.dataset.id);
  element.addEventListener("click", activate);
  element.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});

searchInput.addEventListener("input", event => renderTable(event.target.value));
viewToggle.addEventListener("click", () => {
  const showingVector = vectorView.classList.contains("active-view");
  vectorView.classList.toggle("active-view", !showingVector);
  photoView.classList.toggle("active-view", showingVector);
  viewToggle.textContent = showingVector ? "Exibir versão vetorial" : "Exibir foto original";
});

createPhotoHotspots();
renderTable();
selectCompartment(1);
