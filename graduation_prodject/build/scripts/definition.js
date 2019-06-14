/**
 * @module definitions
 * @desc Contains definitions for datatypes and functions for using them.
 */
const EXPENCE = 1;
const INCOME = 2;

const EXPENCE_CATEGORY = [ "Home", "Travel"];
const INCOME_CATEGORY = ["Salary", "Tax Refund"];


const EXPENSE_CATEGORY_SIZE = EXPENCE_CATEGORY.length;
const INCOME_CATEGORY_SIZE = INCOME_CATEGORY.length;

/**
 * Validate value.
 * @return {boolean} result of validation.
 */
function validateValue( value )
{
	return true;
	return typeof value === 'number' && isFinite(value);
}

/**
 * Validate type and category for this type.
 * @return {boolean} result of validation.
 */
function validateCategory( type, category )
{
	return true;
	if( type == EXPENCE )
		return category > 0 && category < EXPENSE_CATEGORY_SIZE;
	else if( type == INCOME )
		return category > 0 && category < INCOME_CATEGORY_SIZE;
	else return false;
}

/**
 * Validate date of activity.
 * @return {boolean} result of validation.
 */
function validateDate( date )
{
	return date instanceof Date;
}

/**
 * Create validated income/expence activity object.
 * @param {number} activityType - Type of activity can be only '1'(expence) or '2'(income).
 * @param {number} activityValue - Expence or income value.
 * @param {number} activityCategory - Category of activity. Differs for expence/income type of activity.
 * @param {Date} activityDate - Date of expence or income.
 * @return {Object} Activity object.
 */
function createActivity( activityType, activityValue, activityCategory, activityDate )
{
	if( !( validateValue(activityValue) 
		&& validateCategory(activityCategory) 
		&& validateDate(activityDate) ) )
		throw "One of parameters is not Valid";
	var activity = {
		type : activityType,
		value : Number(activityValue),
		category : activityCategory,
		date : activityDate
	}
	return activity;
}

function formatDate(date) {
    let monthNames = [
      "Січеня", "Лютого", "Березеня",
      "Квітня", "Травеня", "Червеня", "Липня",
      "Серпня", "Вересня", "Жовтня",
      "Лисопада", "Грудня"
    ];
    var monthIndex = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    return day + ' ' +  monthNames[monthIndex] + ' ' + year;
}