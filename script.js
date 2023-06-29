const todoInputButton = document.querySelector("#todo-input-button");
const itemsCounter = document.querySelector('.items-counter');
const clearCompletedButton = document.querySelector('.clear-completed');

const filterButtonAll = document.querySelector('.filter-button-all');
const filterButtonActive = document.querySelector('.filter-button-active');
const filterButtonCompleted = document.querySelector('.filter-button-completed');

const themeToggleButton = document.querySelector('.theme-icon');

const body = document.querySelector('body');


let itemsLeft = 0;




const todos = [];

let todoId = 0;


// function createNewTodo () {

// }

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
        // console.log(offset);
        // console.log(box);
        if ( offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child}
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function toggleTheme (newTheme) {
    let itemsToChange = document.querySelectorAll('[data-theme]');
    console.log({itemsToChange});

    let itemsArr = [...itemsToChange];
    itemsArr.forEach( (item) => {
        item.setAttribute('data-theme', newTheme);
    })


}

const todosContainer = document.querySelector('.todos-container');



themeToggleButton.addEventListener('click', () => {

    if (themeToggleButton.getAttribute('data-theme') == 'night') {
        themeToggleButton.setAttribute('data-theme', 'day');
        toggleTheme('day');
    } else {
        themeToggleButton.setAttribute('data-theme', 'night');
        toggleTheme('night');
    }
    // themeToggleButton.setAttribute('')
})


//Allow using enter key instead of clicking
// document.querySelector('#todo-input').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         console.log('pressed enter');
//     }
// })

todoInputButton.addEventListener('click', () => {

    let newTodoText = document.querySelector('#todo-input').value;

    if (newTodoText == '') return;
 
    let todoContainer = document.createElement('div');
    todoContainer.classList.add('display-container');
    todoContainer.classList.add('flex-container');
    todoContainer.classList.add('new-todo-container');
    todoContainer.classList.add('draggable');

    todoContainer.setAttribute('data-visible', 'true');

    let currentTheme = body.getAttribute('data-theme');
    todoContainer.setAttribute('data-theme', currentTheme);


    todoContainer.setAttribute("draggable", "true");

    

    //create checkbox
    let radioButton = document.createElement('input');
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("data-checked", "false");
    radioButton.setAttribute('data-theme', currentTheme);
    radioButton.classList.add('checkbox');
    radioButton.classList.add('active');

    

    let todoTextDiv = document.createElement('div');
    todoTextDiv.classList.add('todo-text');
    todoTextDiv.textContent = newTodoText

    let removeTodoButton = document.createElement('button');
    removeTodoButton.classList.add('remove-todo-button');



    let checkboxCheck = document.createElement('div');
    checkboxCheck.classList.add('checkmark');
    radioButton.appendChild(checkboxCheck);

    todoContainer.appendChild(radioButton);
    todoContainer.appendChild(todoTextDiv);
    todoContainer.appendChild(removeTodoButton);

    todosContainer.appendChild(todoContainer);

    itemsLeft++;
    itemsCounter.textContent = itemsLeft;

    //clear input text

    document.querySelector('#todo-input').value = '';
    // let todoInputNode = document.querySelector('#todo-input');
    // todoInputNode.value = '';
    // console.log({todoInputNode});

    

    let draggables = document.querySelectorAll('.draggable');
    let newContainers = document.querySelectorAll('.new-todo-container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            console.log('dragging');
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })

    })

    todosContainer.addEventListener('dragover', e => {
        e.preventDefault;
        const afterElement = getDragAfterElement(todosContainer, e.clientY);
        // console.log({afterElement});

        const draggable = document.querySelector('.dragging');

        if (afterElement == null) {
            todosContainer.appendChild(draggable);
        } else {
            todosContainer.insertBefore(draggable, afterElement)
        }


    })
    

    



})

document.addEventListener('click', e => {
    const isDraggable = e.target.matches('.draggable');
    // if (!isDraggable && e.target.closest(".new-todo-container") != null) return;
    if (!isDraggable) return;
    if (isDraggable) {
        console.log('dragging');
    }
})

document.addEventListener('click', e => {
    const isRemoveTodoButton = e.target.matches('.remove-todo-button');
    if (!isRemoveTodoButton && e.target.closest(".new-todo-container") != null) return;

    if (isRemoveTodoButton) {
        // console.log("isRemoveTodoButton")
        let parentTodoContainer = e.target.closest(".new-todo-container");

        let checkbox = parentTodoContainer.querySelector('.checkbox');
       

        console.log({parentTodoContainer})
        console.log({checkbox})
        if (checkbox.getAttribute('data-checked') == "false") {
            itemsLeft--;
            itemsCounter.textContent = itemsLeft;
        }
        todosContainer.removeChild(parentTodoContainer);
        // itemsLeft--;
    }
})

document.addEventListener('click', e => {
    const isCheckbox = e.target.matches('.checkbox');


    const isCheckmark = e.target.matches('.checkmark');
    
    if ((!isCheckbox && !isCheckmark) && e.target.closest(".new-todo-container") != null) return;

    // if (isCheckmark) {
    //     console.log('is checkmark');
    // }

    if (isCheckbox || isCheckmark) {
 
        let checkbox = e.target.closest('.checkbox')
        let parentTodoContainer = e.target.closest(".new-todo-container");

        
        if (checkbox.getAttribute('data-checked') == 'false') {
            checkbox.setAttribute('data-checked', 'true')
            itemsLeft--;
            itemsCounter.textContent = itemsLeft;
        } else if (checkbox.getAttribute('data-checked') == 'true') {
            checkbox.setAttribute('data-checked', 'false')
            itemsLeft++;
            itemsCounter.textContent = itemsLeft;
        }

        // console.log({parentTodoContainer});

        // console.log({checkbox});
    }
})

clearCompletedButton.addEventListener('click', () => {

    let todoItems = document.querySelectorAll('.new-todo-container')
    let todoArr = [...todoItems];
    // console.log({todoItems});
    // console.log({todoArr});

    todoArr.forEach( (item) => {
        let checkbox = item.querySelector('.checkbox');
        if (checkbox.getAttribute('data-checked') == 'true') {
            todosContainer.removeChild(item);
        }
    })

})

filterButtonAll.addEventListener('click', () => {

    filterButtonAll.setAttribute('data-selected', 'true');
    filterButtonActive.setAttribute('data-selected', 'false');
    filterButtonCompleted.setAttribute('data-selected', 'false');

    let todoItems = document.querySelectorAll('.new-todo-container');
    let todoArr = [...todoItems];

    todoArr.forEach( (item) => {
        item.setAttribute('data-visible', "true");

    })
})


filterButtonActive.addEventListener('click', () => {

    filterButtonAll.setAttribute('data-selected', 'false');
    filterButtonActive.setAttribute('data-selected', 'true');
    filterButtonCompleted.setAttribute('data-selected', 'false');

    let todoItems = document.querySelectorAll('.new-todo-container');
    let todoArr = [...todoItems];

    todoArr.forEach( (item) => {
        let checkbox = item.querySelector('.checkbox');
        if (checkbox.getAttribute('data-checked') == 'true') {
            item.setAttribute('data-visible', "false");
        } else {
            item.setAttribute('data-visible', "true")
        }
    })
})

filterButtonCompleted.addEventListener('click', () => {

    filterButtonAll.setAttribute('data-selected', 'false');
    filterButtonActive.setAttribute('data-selected', 'false');
    filterButtonCompleted.setAttribute('data-selected', 'true');

    let todoItems = document.querySelectorAll('.new-todo-container');
    let todoArr = [...todoItems];

    todoArr.forEach( (item) => {
        let checkbox = item.querySelector('.checkbox');
        if (checkbox.getAttribute('data-checked') == 'true') {
            item.setAttribute('data-visible', "true");
        } else {
            item.setAttribute('data-visible', "false")
        }
    })
})

