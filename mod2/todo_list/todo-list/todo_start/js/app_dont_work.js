//global selectors
const INCOMPLETE_LIST = document.querySelector('#incomplete-tasks'); //кеширование функций, когда функцию выносят в переменную
const COMPLETE_LIST = document.querySelector('#completed-tasks');
const NEW_TASK_INPUT = document.querySelector('#new-task');
const TEMPLATE_LI = document.querySelector('#templateLi');
const CONTAINER = document.querySelector('.container');

const CLASS_EDIT = 'editMode';
const CLASS_BTN_EDIT = 'edit';
const CLASS_BTN_DELETE = 'delete';


CONTAINER. addEventListener('click', onClick);
CONTAINER.addEventListener('keypress', () => {

});

/*function addItem() {
   let text = NEW_TASK_INPUT.value;

   let li = document.createElement('li');
   let label = document.createElement('label');
   let inputText = document.createElement('input');
   let inputCheckbox = document.createElement('input');
   let buttonEdit = document.createElement('button');
   let buttonDelete = document.createElement('button');

   inputText.type = 'text';
   inputCheckbox.type = 'checkbox';
   buttonEdit.classList.add('edit');
   buttonDelete.classList.add('delete');
   buttonEdit.innerText = 'Edit';
   buttonDelete.innerText = 'Delete';

   label.innerText = text;

   li.appendChild(inputCheckbox);
   li.appendChild(label);
   li.appendChild(inputText);
   li.appendChild(buttonEdit);
   li.appendChild(buttonDelete);

   INCOMPLETE_LIST.appendChild(li);

   NEW_TASK_INPUT.value = '';
}

//events declaration
document.querySelector('.container').addEventListener('click', onClick);*/

//function declaration

/**
* Проверяет целевой элемент клика и запускает определенную функцию
* @param {object} event - встроенные объект событий
* @return {boolean} - true если элемент чекбокс, false - если нет, возвращает булевое значение если элемент чекбокс
*/
function onClick(event) {
   let TARGET = event.target; //записали свойство таргет обьекта ивента

   switch (true) {
       case isCheckbox(TARGET):
           relocateLi(TARGET);
           return;
       case TARGET.classList.contains(CLASS_BTN_EDIT):
           editLi(TARGET.closest('li'));
           return;
       case TARGET.classList.contains(CLASS_BTN_DELETE):
           deleteLi(TARGET.closest('li'));
           return;
       case TARGET.id == 'add':
           addItem();
   }
}

/**
* Проверяет является ли элемент чек боксом
*
* @param {dom element} el - DOM элемент который проверяется
* @return {boolean} - true если элемент чекбокс, false - если нет, возвращает булевое значение если элемент чекбокс
*/
function isCheckbox(el) {
   return el.tagName == 'INPUT' && el.type == 'checkbox';
}

/**
* Меняет сосояние между стандартным и состоянием редактирования
*
* @param {dom element} target - DOM элемент списка
*
*/
function editLi(li) {
   const LABEL = li.querySelector('label');

   if (li.classList.contains(CLASS_EDIT)) {
       LABEL.innerText = li.querySelector('input[type="text"]').value;
   } else {
       li.querySelector('input[type="text"]').value = LABEL.innerText;
   }

   li.classList.toggle(CLASS_EDIT);
}
//Удаляет элемент списка

// @param {dom element} li -элемент саписка


function deleteLi(li) {
   li.remove();
}

//Перенести элемент списка из TODO в Completed или наоборот

// @param {dom element} li -элемент саписка


function relocateLi(target) {
   const LI = target.closest('li');

   if ( target.checked ) {
       // relocate to completed
       COMPLETE_LIST.appendChild(li);
       LI.classList.remove(CLASS_EDIT);
       return;
   }
   // relocate to TODO
   INCOMPLETE_LIST.appendChild(li);
}

//Добавляет новый элемент в список TODO

function addItem() {
    const LI = TEMPLATE_LI.content.cloneNode(true);
    const LABEL = LI.querySelector('label');

    LABEL.innerText = NEW_TASK_INPUT.value;
    INCOMPLETE_LIST.appendChild(LI);

    NEW_TASK_INPUT.value = '';
}

/* если нажали кнопку enter при вводе текста - сохранять результат:
то есть, либо сохранять элемент, либо добавлять новый

@param {dom_element} el - DOM элемент, которы проверяется 
*/
function onKeyPress(event) {
    if(
    !(isTextInput(event.target) && event.keyCode == 13)
    ) {
        return;
    }
    switch(true) {
        case TARGET.id == 'new-task':
          addItem();
          return;
        default
          editLi(TARGET.closest('li'));
    }
}
