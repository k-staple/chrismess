const button = document.querySelector('button');
const headingToChange= document.querySelector('.whisper');
const form= document.querySelector('form');
const headingToggleDisappear = document.querySelector('.hid')


let i=10;
function changeHeadingText (){
    headingToChange.textContent = i;
    if(i > 0) i--;
}

function addSecondFieldToList(event, liItem, list, f){
   //add second field to a span element and then the 1 liItem
   const spanPerson = document.createElement('span');
   spanPerson.textContent = f.sender.value;
   spanPerson.style.color = 'red';
   spanPerson.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
   liItem.appendChild(spanPerson);
   list.appendChild(liItem);
}

function revealHiddenMessage(stone) {
   //reveal hidden message if doesn't send a stone
   const regex= /.*space.*|.*mind.*|.*time.*|.*reality.*|.*power.*|.*soul.*/i;
   if (!(regex.test(stone))){
       headingToggleDisappear.classList.remove('hid');
   }
}

function stoneHeadingAndList(event){
    event.preventDefault();  //should be first line
    const f= event.target;
    const stone= f.stone.value;
    headingToChange.textContent = stone;
    //select list and create list item
    const list = document.querySelector('#trove'); //from html already
    const liItem = document.createElement('li');
    const spanStone = document.createElement('span')
    spanStone.textContent = stone;
    spanStone.style.color = '#ff00ff';
    spanStone.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
    liItem.appendChild(spanStone);
    liItem.appendChild(document.createElement('br'));
    addSecondFieldToList(event, liItem, list, f);
    revealHiddenMessage(stone);   

    f.reset();
}

button.addEventListener('click', changeHeadingText);
form.addEventListener('submit', stoneHeadingAndList);