const url = "wss://echo-ws-service.herokuapp.com";

const btn_send = document.querySelector(".btn-send");
const btn_geo = document.querySelector(".btn-geo");
const inp = document.querySelector("input");
const chat = document.querySelector(".chat");

let websocket;
let clients = "";

websocket = new WebSocket(url);

// СООБЩЕНИЕ КЛИЕНТА
function writeClient(message){ 
  let client = `
  <div class = "request">
    <div class = "message">
      ${message}
    </div>
  </div>
  `
  clients = clients + client;
  chat.innerHTML = clients;
  
}

// ГЕОЛОКАЦИЯ
function writeGeo(url){
  let client = `
  <div class = "request">
    <div class = "message"> 
      <a id = "map-link" target="_blank" href = "${url}"> Гео-локация </a>
    </div>      
  </div>
  `
  clients = clients + client;
  chat.innerHTML = clients;
}

// ОТВЕТ СЕРВЕРА
function writeServer(message){ 
  let client = `
  <div class = "answer">
   <div class = "message">
      ${message}
    </div>
  </div>
  `
  clients = clients + client;
  chat.innerHTML = clients;
}

// НАЖАТИЕ НА ОТПРАВИТЬ
btn_send.addEventListener('click', () =>{   
  let message = inp.value;  
  if(message){
    writeClient(message);
    websocket.send(message);
  }
  websocket.onmessage = function(e){
     writeServer(e.data);
  }
  inp.value = "";
})

//ОШИБКА ПОИСКА ГЕОЛОКАЦИИ
const error = () => {
  writeClient('Невозможно получить ваше местоположение');
}

// ПЕРЕДАЧА ГЕОЛОКАЦИИ
const success = (position) => {  
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  writeGeo(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
}

// НАЖАТИЕ НА ГЕОЛОКАЦИЮ
btn_geo.addEventListener('click', () =>{
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  }
  else{
     navigator.geolocation.getCurrentPosition(success, error);
  }
})