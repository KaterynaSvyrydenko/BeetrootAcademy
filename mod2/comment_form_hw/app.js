  /*
      Реализовать функционал добавления и удаления комментариев.
      Требования:
      1. Дата - текущая дата на момент напиcания комментария. (можно сделать с помощью объекта Date https://learn.javascript.ru/datetime )
      2. Максимальное количество символов для поля name - 255
      3. Оба поля в форме обязательны к заполнению.
      4. Использовать тег template для описания шаблона комментария
      5. Использовать делигирование событий для обработки нажатий на кнопки
      6. Комментировать код используя синтаксис jsDoc
      7. Кэшировать выполнение функций там где это возможно.
      8. Использовать верно переменные и константы.
      */

// global selectors

  const COMMENT_TEXT = document.querySelector('#comment')
  const NAME_TEXT = document.querySelector('#name');
  const NAME_AREA = NAME_TEXT.setAttribute('maxlength', '255');
  const HIDDEN_TEXT = document.querySelectorAll('.checking');
  /*const COMMENT_LIST = document.querySelector('.comments-list');*/
 /* const COMMENT_LISTITEM = document.querySelector('.comments-list_item');*/
 /* var button = document.querySelector("input[type='button']");*/

// events declaration
  document.querySelector("main").addEventListener('click', onClick);

// function declarations

/**
 * Проверят целевой элемент клика и запускает определенную функцию

 * @param {object} event - встроенные объект событий
 */
function onClick(event) {
    const TARGET = event.target;
    switch (true) {
        case isButton(TARGET):
            addComment(TARGET);
            return;
        case TARGET.classList.contains('comments-list_delete'):
            TARGET.closest('.comments-list_item').remove();
            return;
    }
}
/**
 * Проверяет есть ли у элемента тип button
 * 
 * @param {dom element} el - DOM элемент который проверяется
 * @return {boolean} - true если элемент button, false - если нет
 */
  function isButton(el) {
      return el.type == 'button';
  }
/*Функция, которая запускает функцию валидации формы и если ее результат true -
 выполняется функция добавления нового комментария*/
  function addComment(){ 
      if( validation() )
          addItem();
  }

/*Проверка валидации формы, если #name =='' или #comment == '' - false

  @return {boolean} 
*/
  function validation() {
      var valid = true;
        if(NAME_TEXT.value == '') {
            NAME_TEXT.focus();
            HIDDEN_TEXT[0].style.display = 'block';
            valid = false;
          } else{
            HIDDEN_TEXT[0].style.display = 'none';
          }
          if(COMMENT_TEXT.value == '') {
            COMMENT_TEXT.focus();
            HIDDEN_TEXT[1].style.display = 'block';
            valid = false;
          } else {
            HIDDEN_TEXT[1].style.display = 'none';
          }
          return valid;
      }

  /* Функция создает template шаблон для добавления нового комметария пользователем в формате
   #name, #comment и COMMENT_TEXT*/

  function addItem() {
      var templateComment = document.querySelector('#templateComment');
      var template = templateComment.content.cloneNode(true);
      template.querySelector('lorem').textContent = COMMENT_TEXT.value;
      template.querySelector('.comments-list_date').textContent = formatDate(new Date());
      template.querySelector('.comments-list_name').textContent = NAME_TEXT.value;
      document.querySelector('.comments-list').appendChild(template);
  }

  /*
  Функция вывода формата даты публикации комментария
  @param {object}
  @return {string}
  */
function formatDate(date) {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var monthIndex = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds()

    return monthNames[monthIndex] + ' ' + day +', ' + year + ' ' + hours +':' + minutes + ':' + seconds;
  }

