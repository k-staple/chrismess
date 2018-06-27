const button = document.querySelector('button');
const headingToChange= document.querySelector('.whisper');
const headingToggleDisappear = document.querySelector('.hid')

const record = [];
let i=10;

function changeHeadingText (){
        headingToChange.textContent = i;
        if(i > 0) i--;
}


class App {

    constructor(){
        const form= document.querySelector('form');
        const delButtons = document.querySelector('del');
        const list = document.querySelector('#trove'); //from html already
        
        
        form.addEventListener('submit', (ev) => {
          ev.preventDefault();
          this.handleSubmit(ev, list);
        });

        //listen on html that is there from beginning
        list.addEventListener('click', (ev) => {
          ev.preventDefault();
          this.handleDel(ev);
        });
    }

    
    

    /*
    function addSecondFieldToList(event, liItem, list, f){
    //add second field to a span element and then the 1 liItem
    const spanPerson = document.createElement('span');
    spanPerson.textContent = f.sender.value;
    spanPerson.style.color = 'red';
    spanPerson.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
    liItem.appendChild(spanPerson);
    list.appendChild(liItem);
    }
    */


    renderProperty(name, value) {
        //creates span element with class equal to name
        const span = document.createElement('span');
        span.textContent = value;
        span.classList.add(name);
        span.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
        return span;
    }

    renderItem(gift){  
        //generate html w a span for each property
        const item = document.createElement('li');
        item.classList.add('gem'); //new class created in this function
        
        //get list of prop
        const properties = Object.keys(gift);
        //loop over each prop
        properties.forEach( (propertyName) => {
            const span = this.renderProperty(propertyName, gift[propertyName]);
            item.appendChild(span); 
        });

        const del = document.createElement('button');
        del.textContent = 'Remove';
        del.classList.add('del');
        item.appendChild(del);

        return item;
    }

    revealHiddenMessage(stone) {
        //reveal hidden message if doesn't send a stone
        const regex= /.*space.*|.*mind.*|.*time.*|.*reality.*|.*power.*|.*soul.*/i;
            if (!(regex.test(stone))){
                headingToggleDisappear.classList.remove('hid');
            }
    }

    handleSubmit(event, list){
        const f= event.target;
        const stone = f.stone.value
        headingToChange.textContent = stone;
        const gift = {
            stone: stone,
            person: f.sender.value,
        }
       
        record.push(gift);

        const item = this.renderItem(gift)  //CHANGE BELOW

        //select list and create list item
        
        list.appendChild(item)

    /* const liItem = document.createElement('li');
        const spanStone = document.createElement('span')
        spanStone.textContent = stone;
        spanStone.style.color = '#ff00ff';
        spanStone.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
        liItem.appendChild(spanStone);
        liItem.appendChild(document.createElement('br'));
        addSecondFieldToList(event, liItem, list, f); */
    
        this.revealHiddenMessage(stone);   

        f.reset();
        f.stone.focus();
    }

    handleDel(ev){
      const ul = event.target; //why redefine?
      ul.removeChild(ul.childNodes[0]);
      
    }


}

const app = new App();

button.addEventListener('click', changeHeadingText);
