const payCode = document.querySelector('#payCode');
payCode.addEventListener('click', function() {
  const codeInput = document.querySelector('#code');
  const code = codeInput.value;
  const cleanedCode = code.replace(/\s/g, '');
  if (cleanedCode.length === 0) {
    alert('Введите код');
    codeInput.style.borderColor = 'brown';
    return;
  }

  if (!/^\d+$/.test(cleanedCode)) {
    alert('Код должен содержать только цифры');
    return;
  }
  if (cleanedCode.length > 6 || cleanedCode.length < 6) {
    alert('Неверный код!');
    return;
  }

  codeInput.value = '';
  codeInput.style.borderColor = '#210C10';

  checkCode(cleanedCode);
});
    
const FAQ = document.querySelector('#faq');
FAQ.addEventListener('click', function() {
    alert('FAQ');
});
//showLoader('Тест загрузка');

function checkCode(code){
  

    const data = {
        code: code
    };
    
    const jsonBody = JSON.stringify(data);

    fetch(`${domain}/admin/api/tickets/auth.php`, {
        method: 'POST',
        body: jsonBody,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {

            if(response.status == 503){
              alert('Не верный код!');
              return;
            }

            throw new Error(`Произошла ошибка при запросе. Статус: ${response.status}, Подробности: ${response.statusText}`);
        }
        return response.json();
    })
    .then(json => {
        window.location.reload();
    })
    .catch(error => {
        if (error.name === 'AbortError') {
            alert('Сервер временно не доступен! Подробнее: info@example.ru');
        } else {
            alert(error.message);
        }
    });
}