const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const crossIcon = document.querySelector('.cross-icon');
const contentContainer = document.querySelector('.content');
const overlay = document.querySelector('.overlay');

menuIcon.addEventListener('click', function () {
    menuIcon.classList.add('hide');
    menuIcon.classList.remove('show');
    crossIcon.classList.add('show');
    crossIcon.classList.remove('hide');
    sidebar.classList.add('show-sidebar');
    overlay.style.display = 'block';
    // stopping body from scrolling
    document.body.style.overflow = 'none';
});

crossIcon.addEventListener('click', function () {
    menuIcon.classList.add('show');
    menuIcon.classList.remove('hide');
    crossIcon.classList.add('hide');
    crossIcon.classList.remove('show');
    sidebar.classList.remove('show-sidebar');
    overlay.style.display = 'none';
    // enabling body for scrolling
    document.body.style.overflow = 'none';
});

///////////////////////------------------------------/////////////////////////

const itemsContainer = document.querySelector('.items-container');
const addItem = document.querySelector('.add-item');
// console.log(addItem);
let counter = 2;

function createElements() {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item', 'd-flex', 'mb-3', 'align-items-end');

    const div1 = document.createElement('div');
    div1.classList.add('col-5', 'me-3');

    const div2 = document.createElement('div');
    div2.classList.add('col-5', 'me-3');

    const div3 = document.createElement('div');
    div3.classList.add('col');

    const label1 = document.createElement('label');
    label1.classList.add('form-label');
    label1.setAttribute('for', 'item' + counter);
    label1.innerText = 'Item';
    const input1 = document.createElement('input');
    input1.classList.add('form-control');
    input1.type = 'text';
    input1.name = `items[item${counter}][itemName]`;
    input1.id = 'item' + counter;
    input1.placeholder = 'Item';
    input1.setAttribute('list', 'items-data-list');
    input1.required = true;

    const label2 = document.createElement('label');
    label2.classList.add('form-label');
    label2.setAttribute('for', 'quantity' + counter);
    label2.innerText = 'Quantity';
    const input2 = document.createElement('input');
    input2.classList.add('form-control');
    input2.type = 'number';
    input2.name = `items[item${counter}][quantity]`;
    input2.id = 'quantity' + counter;
    input2.placeholder = 'Quantity';
    input2.min = '1';
    input2.required = true;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'col-12', 'delete-item');
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'Delete';

    counter++;

    div1.append(label1, input1);
    div2.append(label2, input2);
    div3.append(deleteBtn);
    itemDiv.append(div1, div2, div3);

    return itemDiv;
}

function setHiddenFieldValue() {
    const hiddenItems = document.getElementById('hiddenItems');
    const orderBody = document.querySelector('.body');
    hiddenItems.value = orderBody.innerHTML;
}

// Adding event listener to document for for all delete button
document.addEventListener('click', function (event) {
    if (event.target.matches('.delete-item')) {
        console.log(event.target);
        event.target.parentElement.parentElement.remove();
        counter--;
        setHiddenFieldValue();
    }
});

addItem.addEventListener('click', function (event) {
    const itemDiv = createElements();
    itemsContainer.insertBefore(itemDiv, addItem);
    setHiddenFieldValue(event);
});


// setting hidden field value
// document.addEventListener('click', function () {
//     const hiddenItems = document.getElementById('hiddenItems');
//     const itemsContainer = document.querySelector('.body')
//     hiddenItems.value = itemsContainer.innerHTML;
// });

document.addEventListener('change', function (e) {
    // if(e.target.parentElement.parentElement.matches('.item') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.matches('.body')){
    // e.target.setAttribute('value', e.target.value);
    // const hiddenItems = document.getElementById('hiddenItems');
    // const itemsContainer = document.querySelector('.body');
    // hiddenItems.value = JSON.stringify(itemsContainer.innerHTML);
    // console.log(itemsContainer.innerHTML);
    // }

    ///---///
    if (e.target.type !== 'textarea') {
        e.target.setAttribute('value', e.target.value);
    } else {
        e.target.innerText = e.target.value;
    }
    setHiddenFieldValue();
    ///---///
});

///////////////////////------------------------------/////////////////////////