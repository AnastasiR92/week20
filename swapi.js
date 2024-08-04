// function addData(event) {
//     event.preventDefault();

//     const type = document.getElementById('type').value;
//     const number = document.getElementById('number').value;

//     const addData = {
//         type: type,
//         number: number
//     };

// fetch('https://swapi.py4e.com/api/films/:id/', 'https://swapi.py4e.com/api/people/:id/', 'https://swapi.py4e.com/api/planets/:id/', 'https://swapi.py4e.com/api/species/:id/', 'https://swapi.py4e.com/api/starships/:id/', 'https://swapi.py4e.com/api/vehicles/:id/',{
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json; HTTP/1.0 200 OK'
//     },
//     body: JSON.stringify(addData)
// })

// .then(response => response.json())
// .then(add => {
//     const postDiv = generatePost(add);
//     addPostToContainer(addDiv);
//     // Очистка input после отправки формы
//     document.getElementById('type').value = '';
//     document.getElementById('number').value = '';
// })
// .catch(error => console.error('Ошибка добавления поста:', error));
// }

// document.getElementById('main-form').addEventListener('submit', addData);

// function addToContainer(addDiv) {
//     const container = document.getElementById('add-container');
//     container.innerHTML += addDiv;
// }


function addData(event) {
    event.preventDefault();
  
    const type = document.getElementById('type').value;
    const id = document.getElementById('id').value;
    const loader = document.getElementById('loader');
  
    const url = `https://swapi.py4e.com/api/${type}/${id}/`;
  
    fetch(url)
     .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка ${response.status}`);
        }
      })
     .then(data => {
        const postDiv = generatePost(data);
        addToContainer(postDiv);
        // Очистка input после отправки формы
        document.getElementById('id').value = '';
      })
     .catch(error => {
        console.error('Ошибка добавления поста:', error);
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка: ' + error.message;
        addToContainer(errorDiv);
    })
    .finally(() => {
        loader.style.display = 'none'; // Скрыть индикатор загрузки
    })
    // Перед отправкой запроса показать индикатор загрузки
    loader.style.display = 'block';
  }
  
  document.getElementById('main-form').addEventListener('submit', addData);
  
  function addToContainer(addDiv) {
    const container = document.getElementById('add-container');
    container.innerHTML = ''; // Очистка контейнера перед добавлением нового содержимого
    container.appendChild(addDiv);
  }
  
  function generatePost(data) {
    const postDiv = document.createElement('div');
    if (data.name) {
      postDiv.textContent = data.name;
    } else if (data.title) {
      postDiv.textContent = data.title;
    } else {
      postDiv.textContent = 'Нет информации';
    }
    return postDiv;
  }