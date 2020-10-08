window.addEventListener('load', start);

var globalNames = ['um', 'dois', 'tres', 'quatro'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {

    function insertName(name) {
        globalNames.push(name); //adicionando nome inserido no input à lista de nomes
    }

    function updateName(nome) {
        globalNames[currentIndex] = nome;
    }

    function handleTyping(event) {
        var hasText = !!event.target.value && event.target.value.trim() !== '';

        if (!hasText) {
            clearInput();
            return
        }

        if (event.key === 'Enter' && event.target.value) {
            if (isEditing) {
                updateName(event.target.value);
            } else {
                insertName(event.target.value);
            }
            render();
            isEditing = false;
            clearInput();
        }
    }

    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

function render() {

    function createdeleteButton(index) {

        function deleteName() {
            globalNames.splice(index, 1); //removendo o elemento do array
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'X';

        button.addEventListener('click', deleteName);

        return button
    }

    function createSpan(name, index) {

        function editItem() {
            inputName.value = name;
            currentIndex = index;
            inputName.focus();
            isEditing = true;
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    var ul = document.createElement('ul');

    for (var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createdeleteButton(i);
        var span = createSpan(currentName, i);


        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}