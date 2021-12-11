/* *****************************************

-- Basic Calculator by Vladimir Mijajlović

*******************************************/

// creating class 'Calculator'
class Calculator {

    // calculator constructor 
    constructor(previousOperandTextElement, currentOperandTextElement) {

        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

        //making sure calculator display is clear every time it reloads
        this.clear()

    }

    // 'clear' method for clearing display
    clear() {

        // calculator properties
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    // 'delete' method for deleting last number from current operand
    delete() {

        // we stop method execution
        // if we try to delete number from empty current operand 
        if(this.currentOperand === '') return

        // removing last number(string) from current operand
        // and updating current operand property
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    // append method for concatenating numbers as user clicks number buttons
    appendNumber(number) {

        // perventing user from typing multiple dots('.') in a row
        // if he tries to type more than one dot, we stop executing this method
        if(number === '.' && this.currentOperand.includes('.')) return

        // updating current operand property with newly added number
        // and since we need to concatenate numbers, we have to transform them to strings
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    // method for setting chosen 'operation' to our 'this.operation' property
    choseOperation(operation) {

        // perventing users from clicking operations 
        // if they previously did not enter current operand 
        if(this.currentOperand === '') return

        // if there are both current and previous operands
        // we execute compute method which computes 2 operands 
        if(this.previousOperand !== '') {
            this.compute()
        }

        // setting chosen operation to our property
        this.operation = operation

        // moving current operand to previous operand place
        // and making current operand place available for new number
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    // compute method for computing 2 numbers
    compute() {
        
        // variable for holding computation result
        let computation

        // converting previous and current operands to number type
        // since we have to perform math operations on them
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        // here we are perventing user from doing any computations 
        // if there are not entered both previous and current operands
            // e.g. if user try to pres '=' while there is only current operand entered 
            // we stop method from executing
        if(isNaN(prev) || isNaN(current)) return

        // going through 4 different operation cases 
        // and setting computation result into variable 'computation'
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        // after we compute, we set current operand to result of computation
        this.currentOperand = computation

        // resetting operation to undefined
        this.operation = undefined

        // clearing out previous operand 
        this.previousOperand = ''
    }

    // in this method we format display numbers
    getDisplayNumber(number) {

        // converting entered number to string
        const stringNumber = number.toString()

        // converting string to number and getting number part before sign '.'
        const integerDigits = parseFloat(stringNumber.split('.')[0])

        // getting decimal number after sign '.'
        const decimalDigits = stringNumber.split('.')[1]

        // the actuall display nubmer which holds fully formated number ready to displayed
        let integerDisplay

        // if someone start entering current operand with e.g. '.'
        // we set 'integerDigits' to empty string, which is part before '.' sign
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }

        // if user start entering a numbers, we are gonna format that into - e.g. 123,321
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        // if user types e.g. 12.32, we recognize that he typed that '.' sign after 'integerDigits'
        // so we return that fully formated number with 1st part of the number concatenated with '.'
        // and after that decimal part, that we splited up on line '129'
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } 

        // otherwise we just return the integer that we formated on line '142'
        else {
            return integerDisplay
        }
    }

    // method for updating display, and is called everytime something should be changed on the calculator screen
    updateDisplay() {

        // updating current operand inside html to formated number ready to be displayed
        // we pass the current operand number, and 'getDisplayNumber' method return us the formated version
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand)

        // checking if user have typed some operation and if so, we display 'previousOperand' concatenated with chosen operation
        // inside previous operand html element
        if(this.operation != null) {
            this.previousOperandTextElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }

        // otherwise we clear the previous operand html element
        // e.g. after we compute 2 values and press '=', we should clear out the previous operand space ( 22 + 10 = ...)
        else {
            this.previousOperandTextElement.innerHTML = ''
        }
    }
}

// getting all buttons and display text elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// creating new class object 
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// looping through every number button, including '.' sign
numberButtons.forEach(button => {

    // adding click event on clicked number/'.'
    button.addEventListener('click', () => {

        // invoking calculator methods on specific number/'.'
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

// looping through every operation button
operationButtons.forEach(button => {

    // adding click event on clicked operation
    button.addEventListener('click', () => {

        // invoking calculator methods on specific operation
        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()

    })
})


// delete button click event for calling delete() method 
// which removes last number from .current-operand
deleteButton.addEventListener('click', () => {

    calculator.delete()
    calculator.updateDisplay()

})

// all clear button listener
allClearButton.addEventListener('click', () => {

    // clear our display variables
    calculator.clear()
    // update our display with new cleared values
    calculator.updateDisplay()

})

// equals button listener
equalsButton.addEventListener('click', () => {

    // computing result, but displaying only current operand as result
    calculator.compute()
    // updating display after we press equals
    calculator.updateDisplay()

})






