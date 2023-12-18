window.addEventListener("load", hideLoader);
const exitButton = document.querySelector('#exit');
exitButton.addEventListener('click', function(){
    deleteCookie("AUTH_TOKEN");
    window.location.reload();
});
function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function checkOrientation() {
  var orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";

  if (orientation === "portrait") {
    document.querySelector('.wrapper').style.display = 'flex';
    document.querySelector('.text-error').style.display = 'none';

  } else {
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.text-error').style.display = 'block';
    document.querySelector('.text-error').innerHTML = 'Переверните телефон!';

  }
}

window.addEventListener("resize", checkOrientation);

const viewClose = document.querySelector('.view-close');
const wrapperViewTicket = document.querySelector('.wrapper-view-ticket');
const wrapperTickets = document.querySelector('.wrapper-tickets');
const adminKey = 'YFVtyfCGuihUIGftyFoiJOIhiug';


const addTicket = document.querySelector('#addTicket');
const codeView = document.querySelector('#codeView');

let dataMain;

viewClose.addEventListener('click', function(){
  wrapperViewTicket.style.display = 'none';
});

updateTickets();
showLoader("Обновление билетов...");
function updateTickets() {
  const data = {
      adminKey: adminKey
  };

  // Преобразуем объект data в строку JSON
  const jsonBody = JSON.stringify(data);

  fetch(`${domain}/admin/api/tickets/get.php`, {
      method: 'POST',
      body: jsonBody,
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Произошла ошибка при запросе. Статус: ${response.status}, Подробности: ${response.statusText}`);
      }
      return response.json();
  })
  .then(json => {
     
    dataMain = json;
    wrapperTickets.innerHTML = '';

     for(let i = 0; i < dataMain.length; i++){
        const formattedDate = formatDateToKaliningradTime(dataMain[i].createdAat);
        wrapperTickets.insertAdjacentHTML("beforeend", 
        `
          <div class="tickets-item">
            <p>${i + 1}. ${dataMain[i].code}. Выдан: ${formattedDate}</p>
            <div class="tickets-button">
                <img class="show-ticket" src="provider/src/show.svg" alt="">
                <img class="delete-ticket" src="provider/src/delete.svg" alt="">
            </div>
          </div>
        
        `);
     }

     const deletTicket = document.querySelectorAll('.delete-ticket');
     const showTicket = document.querySelectorAll('.show-ticket');
     
     for(let i = 0; i < deletTicket.length; i++){
      deletTicket[i].addEventListener('click', function(){
          showLoader(`Удаление билета: ${dataMain[i].code}`);
          deleteTicket(dataMain[i].code);
        });
     }

     for(let i = 0; i < showTicket.length; i++){
        showTicket[i].addEventListener('click', function(){
          wrapperViewTicket.style.display = 'flex';
          codeView.innerHTML = dataMain[i].code;

          document.getElementById("qrcode").innerHTML = '';
          new QRCode(document.getElementById("qrcode"), `${domain}?code=${dataMain[i].code}`);

        });
     }

     hideLoader();
  })
  .catch(error => {
      if (error.name === 'AbortError') {
          alert('Сервер временно не доступен! Подробнее: info@example.ru');
      } else {
          alert(error.message);
      }
  });
}

addTicket.addEventListener('click', function(){

  showLoader("Создание билета...");
  addTicketAdmin();
  showLoader("Обновление билетов...");
  wrapperTickets.innerHTML = '';
  updateTickets();
  wrapperTickets.scrollTop = wrapperTickets.scrollHeight;

});


function addTicketAdmin() {

  const data = {
      adminKey: adminKey
  };

  // Преобразуем объект data в строку JSON
  const jsonBody = JSON.stringify(data);

  fetch(`${domain}/admin/api/tickets/add.php`, {
      method: 'POST',
      body: jsonBody,
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Произошла ошибка при запросе. Статус: ${response.status}, Подробности: ${response.statusText}`);
      }
      return response.json();
  })
  .then(json => {
    showLoader("Обновление билетов...");
    wrapperTickets.innerHTML = '';
    updateTickets();
    hideLoader();
  })
  .catch(error => {
      if (error.name === 'AbortError') {
          alert('Сервер временно не доступен! Подробнее: info@example.ru');
      } else {
          alert(error.message);
      }
  });
}

function deleteTicket(code){
    const data = {
      adminKey: adminKey,
      code: code
    };

    // Преобразуем объект data в строку JSON
    const jsonBody = JSON.stringify(data);

    fetch(`${domain}/admin/api/tickets/delete.php`, {
        method: 'POST',
        body: jsonBody,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Произошла ошибка при запросе. Статус: ${response.status}, Подробности: ${response.statusText}`);
        }
        return response.json();
    })
    .then(json => {
    
      showLoader("Обновление билетов...");
      wrapperTickets.innerHTML = '';
      updateTickets();
      hideLoader();
    })
    .catch(error => {
        if (error.name === 'AbortError') {
            alert('Сервер временно не доступен! Подробнее: info@example.ru');
        } else {
            alert(error.message);
        }
    });
}

function formatDateToKaliningradTime(dateString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Kaliningrad',
  };

  const date = new Date(dateString);
  date.setHours(date.getHours() - 1); // Коррекция на 1 час вперед
  const formattedDate = date.toLocaleString('ru-RU', options);
  return formattedDate;
}
