/**
 * @module definitions
 * @desc Contains definitions for datatypes and functions for using them.
 */
const BALANCE = 0;
const EXPENSE = 1;
const INCOME = 2;

/**
*gobal selectors*/

const EXPENSES_SUM = document.querySelector('._expenses_sum');
const EXPENSES_CATEGORY = document.querySelector('.expenses_category');
const EXPENSES_DATE = document.querySelector('.expenses_date');
const INCOMES_SUM = document.querySelector('._incomes_sum');
const INCOMES_CATEGORY = document.querySelector('._incomes_category');
const INCOMES_DATE = document.querySelector('._incomes_date');

let gActivities = getDataFromFile();
let gExpenses = 0;
let gIncomes = 0;
let gType = 0;

/*gActivities = getDataFromFile();*/

/**
 * Validate value.
 * @return {boolean} result of validation.
 */
function validateValue(value) {
    return typeof value === 'number' && isFinite(value);
}

/**
 * Validate date of activity.
 * @return {boolean} result of validation.
 */
function validateDate(date) {
    return date instanceof Date;
}

/**
 * Create validated income/expense activity object.
 * @param {number} activityType - Type of activity can be only '1'(expense) or '2'(income).
 * @param {number} activityValue - expense or income value.
 * @param {number} activityCategory - Category of activity. Differs for expense/income type of activity.
 * @param {Date} activityDate - Date of expense or income.
 * @return {Object} Activity object.
 */
function createActivity(activityType, activityValue, activityCategory, activityDate) {
    if( !( validateValue(activityValue)) 
        || !(validateDate(activityDate)) )
        throw "One of parameters is not Valid";
    var activity = {
        type : activityType,
        value : Number(activityValue),
        category : activityCategory,
        date : activityDate
    }
    return activity;
}
/*
*date formatting
*@param{object}
*/

function formatDate(date) {
    let monthNames = [
      "Січня", "Лютого", "Березня",
      "Квітня", "Травня", "Червня", "Липня",
      "Серпня", "Вересня", "Жовтня",
      "Листопада", "Грудня"
    ];
    var monthIndex = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    return day + ' ' +  monthNames[monthIndex] + ' ' + year;
}

/*
* Create template element list item 
*@param {string} - choosen category
*@param {number} - value of income or expence from input
*@param {string} - choosen date
*@param {string} - target selector of list 
*/

function pushListItem(category, value, date, templateId, listSelector) {
    let template = document.querySelector(templateId);
    let templateItem = template.content.cloneNode(true);

    templateItem.querySelector('.category_name').textContent = category;
    templateItem.querySelector('.sum').textContent = value + '₴';
    templateItem.querySelector('.date').textContent = formatDate(date);

    document.querySelector(listSelector).appendChild(templateItem);
};

/*
*Summary of balance, incomes or expenses
*/

function updateSummary() {
    let summary = document.querySelector('._balance_sum');
    let menuIncomes = document.querySelector('._menu_incomes');
    let menuExpenses = document.querySelector('._menu_expenses');
    let menuBalance = document.querySelector('._menu_balance');

    menuIncomes.innerText = gIncomes +'₴';
    menuExpenses.innerText = gExpenses +'₴';
    menuBalance.innerText = gIncomes - gExpenses +'₴';

    switch(gType){
        case BALANCE : 
            summary.innerText = gIncomes - gExpenses +'₴';
            break;
        case INCOME : 
            summary.innerText = gIncomes + '₴';
            break;
        case EXPENSE :
            summary.innerText = gExpenses +'₴';
            break;
    }
}

/*
*process gActivities and create list item
*@param {number} - BALANCE - 0; EXPENSE - 1; INCOME - 2;
*/

function loadData(){
    gActivities.forEach(function(element) {
        if(gType == element.type || gType == BALANCE){
            pushListItem(
                         element.category,
                         element.value, element.date,
                        '#template_category',
                        '#list_bycategory'
            );
            pushListItem(
                         element.category, 
                         element.value,
                         element.date,
                         '#template_date',
                         '#list_bydate'
            );
        }
        if(INCOME == element.type){
            gIncomes += element.value;
        }else{
            gExpenses += element.value;
        }
    });
}

/*
*Push current user data to file: data.json with help of function writeDataToFile()
*@param {string} - current category
*@param {number} - current value of income or expence from input
*@param {string} - current date
*@param {array} - new array with all current data
*@param {number} - BALANCE - 0; EXPENSE - 1; INCOME - 2
*/

function addItem(category, value, date, arr, type) {
    pushListItem(category, value, date, '#template_category', '#list_bycategory');
    pushListItem(category, value,date, '#template_date', '#list_bydate');
    arr.push(createActivity(type, value, category, date));
    writeDataToFile(arr);
}

/*
*event for popup form
*close form
*/
document.querySelector('._close').addEventListener('click', function(){
    document.querySelector('._popup').style.display = 'none';
});

/*
*event for popup form
*open form
*/
document.querySelector('._callPopup').addEventListener('click', function(){
    document.querySelector('._popup').style.display = 'block';
});

/*
*event for rightSidebar
*show list #list_bydate
*/
document.querySelector('._filter_bydate').addEventListener('click', function(){
   document.querySelector('#list_bydate').classList.toggle('_hide_list');
   document.querySelector('#list_bycategory').classList.toggle('_hide_list');
});


/*
*event for rightSidebar
*show list #list_category
*/
document.querySelector('._filter_bycategory').addEventListener('click', function(){
document.querySelector('#list_bydate').classList.toggle('_hide_list');
document.querySelector('#list_bycategory').classList.toggle('_hide_list');
});

/*
* 
*@param {number} - BALANCE - 0; EXPENSE - 1; INCOME - 2;
*@return {array} - each element of array is chart sector;
*/

function getLabels(type){
    switch(type){
        case BALANCE : 
            return ['Дохід','Витрати'];
        case EXPENSE : 
            return ['Їжа',
                    'Одяг',
                    'Розваги',
                    'Здоров\'я',
                    'Дім',
                    'Транспорт',
                    'Подарунки',
                    'Навчання',
                    'Спорт',
                    'Пожертви',
                    'Інше'];
        case INCOME :
            return ['Заробітня платня','Премія','Подарунок'];
    }
}

/*
**@return {array} - each element of array is chart sector color
*/

function getBckgColor(){
    switch(gType){
        case BALANCE : 
            return ['green', '#B61F51'];
        case EXPENSE : 
            return ['green',
                    '#B61F51',
                    '#23699b',
                    '#7e8439',
                    '#bc6340',
                    '#6d6461',
                    '#e8693e',
                    '#ffffff',
                    '#0570aa',
                    '#610f70',
                    '#9e1f1f',
            ];
        case INCOME :
            return ['green',
                    '#B61F51',
                    '#23699b',
        ];
    }
}

/*
*create array where each element of array is summ of value for each category
*@param {number} - BALANCE - 0; EXPENSE - 1; INCOME - 2;
*@return {array}
*/
function getActivityData(type){
    var labels = getLabels(type);
    var map = new Map;
    var arr = [];
    gActivities.forEach((item) => {
        if(item.type == type) {
            if(!map[item.category]) map[item.category] = 0;
            map[item.category] += item.value;
        }
    });
    for(var i = 0; i < labels.length; ++i)
    {
        if(!map[labels[i]])
            arr.push(0);
        else
            arr.push(map[labels[i]]);
    }
    return arr;
}

/*
*@return{object} - object whith array, where elements of array is data for create chart
*/

function getData(){
    switch(gType){
        case BALANCE : 
            return [{
                backgroundColor: getBckgColor(),
                data: [gIncomes,gExpenses],
            }];
            break;
        case INCOME : 
            return [{
                backgroundColor: getBckgColor(),
                data: getActivityData(INCOME),
            }];
        case EXPENSE :
            return [{
                backgroundColor: getBckgColor(),
                data: getActivityData(EXPENSE),
            }];
    }
}

