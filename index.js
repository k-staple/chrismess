const button = document.querySelector('button');
const headingToChange= document.querySelector('.whisper');
const headingToggleDisappear = document.querySelector('.hid')

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
        this.record = [];
        
        form.addEventListener('submit', (ev) => {
          ev.preventDefault();
          this.handleSubmit(ev, list);
        });

        //listen on html that is there from beginning
        list.addEventListener('click', (ev) => {
          ev.preventDefault();
          this.handleListButtons(ev, list);
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
    save(){
        //store flicks array in local storage
        localStorage.setItem("arrRecord", JSON.stringify(this.record));
    }

    load(){
        this.record = JSON.parse(localStorage.getItem("arrRecord")) || [];
    }

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

        const fav = document.createElement('button');
        fav.textContent = 'Favorite';
        fav.classList.add('fav');
        const del = document.createElement('button');
        del.textContent = "Remove"
        //innerHTML = <i class="fas fa-trash-alt" title="Remove gift"></i>; //make icon
        del.classList.add('del');
        item.appendChild(fav);
        item.appendChild(del);

        return item;
    }

    revealHiddenMessage(stone) {
        //reveal hidden message if doesn't send a stone
        const regex= /.*space.*|.*mind.*|.*time.*|.*reality.*|.*power.*|.*soul.*/i;
            if (!(regex.test(stone))){
                headingToggleDisappear.classList.remove('hid');
                headingToggleDisappear.classList.add('angry');
            }
    }

    //NEW
    /*addGift(gift){
        //add to array in local storage
        this.flicks.
    }
    */

    handleSubmit(event, list){
        const f= event.target;
        const stone = f.stone.value;
        headingToChange.textContent = stone;
        const gift = {
            stone: stone,
            person: f.sender.value,
            favStatus: 0,
        }
        this.record.push(gift);
        this.save();
        
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

    handleListButtons(event, ul){
      const parentLi = event.target.parentElement; //why redefine?
      if (event.target.classList.contains('del')){
        ul.removeChild(parentLi);
        //index of Obj in array then splice
        //CAN DO indexOf IF PASS IN OBJ
        const i = this.record.findIndex( (element) => {
            const stoneText = parentLi.childNodes[0].textContent;
            if (element.stone === stoneText){
                return element;
            }
        });
        this.record.splice(i,1);
      }
      if (event.target.classList.contains('fav')){ //fav button pressed
          parentLi.childNodes[0].classList.toggle('yesFav');
          parentLi.childNodes[1].classList.toggle('yeahFav');
          
          //find yes/no status and negate
          const i = this.record.findIndex( (element) => {
            const stoneText = parentLi.childNodes[0].textContent;
            const personText = parentLi.childNodes[1].textContent;
            if (element.stone === stoneText && element.person === personText){
                element.favStatus = !element.favStatus;
            }
        });
          
      }  

    }

}

const app = new App();

button.addEventListener('click', changeHeadingText);
