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

const COMMENT_TEXT = document.querySelector('#comment')
const NAME_TEXT = document.querySelector('#name');
let nameArea = NAME_TEXT.setAttribute('maxlength', '255');
const HIDDEN_TEXT = document.querySelectorAll('.checking');
let commentList = document.querySelector('.comments-list')

document.querySelector("input[type='button']").addEventListener('click', addComment);

function addComment(){ 
    if( validation() )
        addItem();
}

/*функция вывода формата даты публикации комментария*/

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
/* Проверка валидации формы, если #name =='' и/или #comment == '' - false
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

/* создание template шаблона для добавления нового комметария пользователем в формате #name, #date и COMMENT_TEXT*/

function addItem() {
    var templateComment = document.querySelector('#templateComment');
    var template = templateComment.content.cloneNode(true);
    template.querySelector('lorem').textContent = COMMENT_TEXT.value;
    template.querySelector('.comments-list_date').textContent = formatDate(new Date());
    template.querySelector('.comments-list_name').textContent = NAME_TEXT.value;
    document.querySelector('.comments-list').appendChild(template);
}