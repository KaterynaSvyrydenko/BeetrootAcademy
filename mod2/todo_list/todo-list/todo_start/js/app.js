// global selectors
const INCOMPLETE_LIST = document.querySelector('#incomplete-tasks');
const COMPLETE_LIST = document.querySelector('#completed-tasks');
const NEW_TASK_INPUT = document.querySelector('#new-task');
const TEMPLATE_LI = document.querySelector('#templateLi');
const CONTAINER = document.querySelector('.container');

const CLASS_EDIT = 'editMode';
const CLASS_BTN_EDIT = 'edit';
const CLASS_BTN_DELETE = 'delete';

// events declaration
CONTAINER.addEventListener('click', onClick);
CONTAINER.addEventListener('keypress', onKeyPress);

// function declarations

/**
 * Проверят целевой элемент клика и запускает определенную функцию
 * 
 * @param {object} event - встроенные объект событий
 */
function onClick(event) {
    const TARGET = event.target;

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
 * Если нажата кнопка Enter при вводе текста, сохранять результат
 * то есть либо добавлять новый элемент либо сохранять элемент
 * 
 * @param {object} event - встроенные объект событий
 */
function onKeyPress (event) {
    const TARGET = event.target;

    if (
        !(isTextInput(TARGET) && event.keyCode == 13)
    ) {
        return;
    }

    switch (true) {
        case TARGET.id == 'new-task':
            addItem();
            return;
        default:
            editLi(TARGET.closest('li'));
    }
}

/**
 * Проверяет является ли элемент чекбоксом
 * 
 * @param {dom element} el - DOM элемент который проверяется
 * @return {boolean} - true если элемент чекбокс, false - если нет
 */
function isCheckbox(el) {
    return el.tagName == 'INPUT' && el.type == 'checkbox';
}

/**
 * Проверяет является ли элемент полем для ввода
 * 
 * @param {dom element} el - DOM элемент который проверяется
 * @return {boolean} - true если элемент поле для ввода, false - если нет
 */
function isTextInput(el) {
    return el.tagName == 'INPUT' && el.type == 'text';
}

/**
 * Изменяет состояние между стандартным и состоянием редактирования
 * 
 * @param {dom element} li - элемент списка
 */
function editLi(li) {
    const LABEL = li.querySelector('label');
    const INPUT = li.querySelector('input[type="text"]');

    if (li.classList.contains(CLASS_EDIT)) {
        LABEL.innerText = INPUT.value;
    } else {
        INPUT.value = LABEL.innerText;
    }

    li.classList.toggle(CLASS_EDIT);
}

/**
 * Удаляет элемент списка
 * 
 * @param {dom element} li - элемент списка
 */
/*function deleteLi(li) {
    li.remove();
}*/

/**
 * Перенести элемент списка из TODO в Completed или наоборот
 * 
 * @param {dom element} li - элемент списка
 */
function relocateLi(target) {
    const LI = target.closest('li');

    if ( target.checked ) {
        // relocate to completed
        COMPLETE_LIST.appendChild(LI);
        LI.classList.remove(CLASS_EDIT);
        return;
    } 
    // relocate to TODO
    INCOMPLETE_LIST.appendChild(LI);
}

/**
 * Добавляет новый элемент в список TODO
/* */
/*function addItem() {
   const LI = TEMPLATE_LI.content.cloneNode(true);
   const LABEL = LI.querySelector('label');

   LABEL.innerText = NEW_TASK_INPUT.value;
   INCOMPLETE_LIST.appendChild(LI);

   NEW_TASK_INPUT.value = '';
}*/