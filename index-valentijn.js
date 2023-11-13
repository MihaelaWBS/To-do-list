const form = document.getElementById("form");
const log = document.getElementById("log-event");
let listItems = [];     
let doneListItems = [];
const toDoList = document.getElementById("to-do-list-ul");
const doneList = document.getElementById("done-items-ul")
const input = document.querySelector(".input-field");
const button = document.querySelector(".add-to-list-button");
button.disabled = true;
// input.focus();
let animationRunning = true;
let dragStartIndex;
const doneItemsContainer = document.getElementById("done-items-container");




        // Placeholder effect

const textList = ["Grocery shopping...", "Drink enough Club Mate...", "Exercise...", "Learn JavaScript...", "Call a friend...", "Grocery shopping...", "Drink enough Club Mate...", "Exercise...", "Learn JavaScript...", "Call a friend...", "Grocery shopping...", "Drink enough Club Mate...", "Exercise...", "Learn JavaScript...", "Call a friend..."];

function typeEffect(text, speed, callback) {
    let i = 0;

function type() {
    if (i < text.length && animationRunning) {
        input.placeholder += text.charAt(i);
    i++;
    setTimeout(type, speed);
        } else {
            setTimeout(backspace, 500);
    }
}

function backspace() {
    if (i >= 0 && animationRunning) {
    input.placeholder = input.placeholder.slice(0, -1);
    i--;
    setTimeout(backspace, 50);
        } else {
            if (callback) callback();
    }
}

type();

}

function displayTextSequentially(index) {
    if (index < textList.length) {
        typeEffect(textList[index], 50, function () {
        setTimeout(function () {
        displayTextSequentially(index + 1);
        }, 500);
        });
    }
}

displayTextSequentially(0);
input.addEventListener('input', function() {
    animationRunning = false;
    input.removeAttribute('placeholder');
});

            // END Placeholder effect


        // const userInput = document.getElementById("textInput").value;

        // Toggle button.disabled based on keydown
        const stateHandle = () => {
            input.value === "" ? button.disabled = true : button.disabled = false;
        };
        input.addEventListener("keydown", stateHandle)

        // END Toggle button.disabled based on keydown

        // Display, save local storage

        const saveToLocalStorageToDo = () => {

        const stringifiedToDos = JSON.stringify(listItems);
        localStorage.setItem('listItems', stringifiedToDos);
        

        };

        const saveToLocalStorageDone = () => {

          const stringifiedDones = JSON.stringify(doneListItems);
          localStorage.setItem('doneListItems', stringifiedDones);
          
  
          };

        const loadFromLocalStorageToDo = () => {
        const parsedDataToDo = JSON.parse(localStorage.getItem('listItems'));

            if (parsedDataToDo) {
                listItems = parsedDataToDo;
            } else {
                listItems = [];
            }
            // # 2
            renderToDo();
            };

        const loadFromLocalStorageDone = () => {
      const parsedDataDone = JSON.parse(localStorage.getItem('doneListItems'));
                  if (parsedDataDone) {
                      doneListItems = parsedDataDone;
                  } else {
                      doneListItems = [];
                  }
                  // # 2
                  renderDone();
                  };
       
        const logEventAndAddToArray = event => {
           // const userInput = document.getElementById("textInput").value;
            event.preventDefault();
            const userInput = event.target[0].value;
            console.log(userInput, event);
            // const toDoItem = event.target.value
            if (userInput) {
                log.innerHTML = `<span class="material-symbols-outlined">done</span>Added to the list!`;
                setTimeout(function() {
                    log.innerHTML = "";
                  }, 1000);
                listItems.push(userInput);
                console.log(listItems);
                saveToLocalStorageToDo();
                renderToDo();
  
            } else {
                log.innerText = `Please enter a to do!`; 
            }
            
            event.target.reset();

           };

           /*
           const handleDoneItemDelete = (li, /*toDoThing, doneList) => {
            const toDoThing = li.getAttribute('data-todo'); // ChatGPT
            console.log(doneList);
            listItems = listItems.filter(i => i.title !== toDoThing.title);
            saveToLocalStorageToDo();
            doneList.removeChild(li);
            console.log('Deleted from done-items:', toDoThing);

           };

           */

           const removeItemBackToToDoList = (li, doneList, toDoThing, deleteButton) => {
            const parentList = li.parentNode;
            parentList.removeChild(li);
            toDoList.append(li);
            changeStyleCheckedAddToDoneList (li, toDoThing, deleteButton);
            li.removeAttribute('data-todo');
            console.log('Moved back to to-do list:', toDoThing);
           }

           /*
           const changeStyleCheckedAddToDoneList = (li, formCheck, toDoThing, deleteButton) => {

            console.log("🚀 ~ file: index.js:124 ~ changeStyleCheckedAddToDoneList ~ toDoThing:", li);
            let paragraph = li.querySelector('p');
            const index = listItems.indexOf(toDoThing);
             

            if (formCheck.checked) {
              paragraph.classList.add('checked');
              const parentList = li.parentNode;
              parentList.removeChild(li);
              doneList.appendChild(li);
              doneItemsContainer.style.display = "block";
              listItems = listItems.filter(i => i !== toDoThing);
              saveToLocalStorageToDo();
              doneListItems = doneListItems.filter(k => k !== doneThing);
              
            } else {
              paragraph.classList.remove('checked');
            }    

                doneListItems[index] = paragraph.textContent;
                console.log(listItems);
                
                saveToLocalStorageDone();
                deleteButton.addEventListener('click', () => handleDoneItemDelete(li, toDoThing, doneList));
                formCheck.addEventListener('click', () => removeItemBackToToDoList(li, doneList))
        // changePElementWhenChecked();
      }; */
           
      const changeStyleCheckedAddToDoneList = (li, formCheck, toDoThing, deleteButton) => {
        let paragraph = li.querySelector('p');
        console.log(paragraph);
        const index = listItems.indexOf(toDoThing);
        paragraph.classList.add('checked');
            doneItemsContainer.style.display = "block";
            // doneList.appendChild(li);
            doneListItems.push(toDoThing);  // Move to doneListItems
            console.log(doneListItems);
            listItems.splice(index, 1);  // Remove from listItems

            saveToLocalStorageToDo();
            loadFromLocalStorageToDo();
            saveToLocalStorageDone();
            loadFromLocalStorageDone();
            renderToDo();  // Update the to-do list UI
            renderDone();  // Update the done list UI
      };
        /*
        if (formCheck.checked) {
            paragraph.classList.add('checked');
            doneItemsContainer.style.display = "block";
            // doneList.appendChild(li);
            doneListItems.push(toDoThing);  // Move to doneListItems
            console.log(doneListItems);
            listItems.splice(index, 1);  // Remove from listItems

            saveToLocalStorageToDo();
            loadFromLocalStorageToDo();
            saveToLocalStorageDone();
            loadFromLocalStorageDone();
            renderToDo();  // Update the to-do list UI
            renderDone();  // Update the done list UI
        } else {
            paragraph.classList.remove('checked');
            // If the item is unchecked, move it back to listItems
            /*
            const doneIndex = doneListItems.indexOf(toDoThing);
            if (doneIndex !== -1) {
                doneListItems.splice(doneIndex, 1);
                listItems.push(toDoThing);
                renderToDo();  // Update the to-do list UI
                renderDone();  // Update the done list UI
                saveToLocalStorageToDo();
                saveToLocalStorageDone();
            }
            */
        
    
        //deleteButton.addEventListener('click', () => handleItemDelete(li, toDoThing));
        //formCheck.addEventListener('click', () => removeItemBackToToDoList(li, doneList, toDoThing, deleteButton));
    
    
          const changeStyleCheckedAddToDoList = (li, formCheck, doneThing, deleteButton) => {

            const index = doneListItems.indexOf(doneThing);
            listItems.push(doneThing);
            console.log(doneListItems);
            doneListItems.splice(index, 1);  // Remove from doneListItems
            saveToLocalStorageToDo();
            loadFromLocalStorageToDo();
            saveToLocalStorageDone();
            loadFromLocalStorageDone();
            renderToDo();  // Update the to-do list UI
            renderDone();  // Update the done list UI
            
          
            //deleteButton.addEventListener('click', () => handleItemDelete(li, toDoThing));
            //formCheck.addEventListener('click', () => removeItemBackToToDoList(li, doneList, toDoThing, deleteButton));
        };



           const handleItemDelete = (li, toDoThing) => {
            listItems = listItems.filter(i => i.title !== toDoThing.title);
            saveToLocalStorageToDo();
            toDoList.removeChild(li);

           };

           const handleDoneItemDelete = (li, doneThing) => {

            const indexDone = doneListItems.indexOf(doneThing);

            //doneListItems = doneListItems.filter(i => i.title !== doneThing.title);
            
            doneList.removeChild(li);

            doneListItems.splice(indexDone, 1);
            saveToLocalStorageToDo();
            loadFromLocalStorageToDo();
            saveToLocalStorageDone();
            loadFromLocalStorageDone();
            renderToDo();  // Update the to-do list UI
            renderDone();  // Update the done list UI

           };

           /* const handleToDoUpdate = (li, toDoThing) => {
            console.log(`function handleToDoUpdate is running`);
            console.log(toDoThing);
            console.log(typeof(toDoThing));
            const toDoInputUpdate = document.createElement('input');
            const doneButton = document.createElement('button');
            doneButton.textContent = 'save';
            toDoInputUpdate.type = 'text';
            toDoInputUpdate.value = toDoThing;
            li.replaceChild(toDoInputUpdate, toDoThing);
            */


            const handleToDoUpdate = (button) => {
              console.log(`Eventlistener editbutton`)
              // Get the parent <li> element
              const listItemUpdate = button.closest('.to-do-list-il');
              console.log(listItemUpdate);
            
              // Get the <p> element inside the <li>
              let paragraphUpdateDOM = listItemUpdate.querySelector('p');
              let paragraphUpdate = listItemUpdate.querySelector('p').innerHTML;
              console.log(paragraphUpdate);
            
              // Create an input element
              const inputElementUpdate = document.createElement('input');
              inputElementUpdate.type = 'text';
              inputElementUpdate.value = paragraphUpdate;
              inputElementUpdate.id = 'textInput';
              inputElementUpdate.classList.add('form-control', 'input-field');
              console.log(inputElementUpdate.value);
              console.log(inputElementUpdate);
            
              let parentElementOfNodeOfParagraph = paragraphUpdateDOM.parentNode;
              console.log(parentElementOfNodeOfParagraph);
            
              // Replace the <p> element with the input element
              parentElementOfNodeOfParagraph.replaceChild(inputElementUpdate, paragraphUpdateDOM);
            
              // Focus on the input element
              inputElementUpdate.focus();
            
              inputElementUpdate.addEventListener('keypress', function (event) {
                // Check if the pressed key is Enter (key code 13)
                if (event.key === 'Enter') {
                  // Update the <p> content with the input value
                  paragraphUpdateDOM.textContent = inputElementUpdate.value;
            
                  // Replace the input element with the <p> element
                  parentElementOfNodeOfParagraph.replaceChild(paragraphUpdateDOM, inputElementUpdate);
                }
              });
            
              // Add blur event listener to handle updating the value when the input loses focus
              inputElementUpdate.addEventListener('blur', function () {
                // Update the <p> content with the input value
                paragraphUpdateDOM.textContent = inputElementUpdate.value;
            
                // Replace the input element with the <p> element
                parentElementOfNodeOfParagraph.replaceChild(paragraphUpdateDOM, inputElementUpdate);
            
                const index = parseInt(listItemUpdate.getAttribute('data-index'));
                listItems[index] = inputElementUpdate.value;
            
                // Render the to-do list with the updated array
            
                // Save the updated listItems array to local storage
                saveToLocalStorageToDo();
                loadFromLocalStorageDone();
                renderToDo();
              });
            };

          

          

           


        

        const createToDoElement = (toDoThing, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div')
            const p = document.createElement('p');
            const iconDragDrop = document.createElement('span')
            const checkBoxDiv = document.createElement('div')
            const formCheck = document.createElement('input')
            const buttonContainer = document.createElement('div');
            const deleteButton = document.createElement('span');
            const editButton = document.createElement('span');
            let span = document.createElement('span')
            p.textContent = toDoThing;
            li.setAttribute('data-todo', toDoThing); // ChatGPT 
            li.classList.add("to-do-list-il")
            li.setAttribute('data-index', index);
            li.append(span);
            span.classList.add('spanWithIndex')
            span.innerHTML = `${index+1}`
            li.append(div);
            div.classList.add("draggable")
            div.setAttribute('draggable', true);
            div.append(checkBoxDiv);
            checkBoxDiv.append(formCheck);
            formCheck.classList.add('form-check-input');
            formCheck.type = "checkbox";
            formCheck.value = "";
            formCheck.id = "flexCheckDefault";
            formCheck.addEventListener('click', () => changeStyleCheckedAddToDoneList(li, formCheck, toDoThing, deleteButton));
            div.append(p);
            //div.append(iconDragDrop);
            //iconDragDrop.classList.add('material-symbols-outlined');
            //iconDragDrop.innerHTML = 'drag_handle';
            div.append(buttonContainer);
            buttonContainer.append(editButton)
            editButton.classList.add('material-symbols-outlined', 'editButton');
            editButton.innerHTML = 'edit';
            buttonContainer.append(deleteButton);
            deleteButton.classList.add('material-symbols-outlined', 'deleteButton');
            deleteButton.innerHTML = 'delete';
            deleteButton.addEventListener('click', () => handleItemDelete(li, toDoThing));
            editButton.addEventListener('click', () => handleToDoUpdate(li, toDoThing));
            div.prepend(checkBoxDiv);
            //li.append(p);
            return li;

            
        }

        const createDoneElement = (doneThing, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div')
            const p = document.createElement('p');
            const iconDragDrop = document.createElement('span')
            const checkBoxDiv = document.createElement('div')
            const formCheck = document.createElement('input')
            const buttonContainer = document.createElement('div');
            const deleteButton = document.createElement('span');
            const editButton = document.createElement('span');
            let span = document.createElement('span')
            p.textContent = doneThing;
            li.setAttribute('data-todo', doneThing); // ChatGPT 
            li.classList.add("to-do-list-il")
            li.setAttribute('data-index', index);
            li.append(span);
            span.classList.add('spanWithIndex')
            span.innerHTML = `${index+1}`
            li.append(div);
            div.classList.add("draggable")
            div.setAttribute('draggable', true);
            div.append(checkBoxDiv);
            checkBoxDiv.append(formCheck);
            formCheck.classList.add('form-check-input');
            
            formCheck.type = "checkbox";
            formCheck.value = "";
            formCheck.id = "flexCheckDefault";
            formCheck.setAttribute('checked', true);
            formCheck.addEventListener('click', () => changeStyleCheckedAddToDoList(li, formCheck, doneThing, deleteButton));
            div.append(p);
            p.classList.add('checked');
            //div.append(iconDragDrop);
            //iconDragDrop.classList.add('material-symbols-outlined');
            //iconDragDrop.innerHTML = 'drag_handle';
            div.append(buttonContainer);
            buttonContainer.append(editButton)
            editButton.classList.add('material-symbols-outlined', 'editButton');
            editButton.innerHTML = 'edit';
            buttonContainer.append(deleteButton);
            deleteButton.classList.add('material-symbols-outlined', 'deleteButton');
            deleteButton.innerHTML = 'delete';
            deleteButton.addEventListener('click', () => handleDoneItemDelete(li, doneThing));
            div.prepend(checkBoxDiv);
            //li.append(p);
            return li;

            
        }
        
        const renderToDo = () => {
            toDoList.innerHTML = "";
            listItems.forEach((toDoThing, index) => {
                console.log(toDoThing);
                const listItemContentToDo = createToDoElement(toDoThing, index);
                
                toDoList.append(listItemContentToDo);
            })
            //addEventListeners();
            // checkBoxCheckedEventListener();
            };

            const renderDone = () => {
                doneList.innerHTML = "";
                doneListItems.forEach((doneThing, index) => {
                  console.log(doneListItems);
                    console.log(doneThing);
                    const listItemContentDone = createDoneElement(doneThing, index);
                    console.log(listItemContentDone);
                    doneList.append(listItemContentDone);
                    console.log(doneList)
                })
                //addEventListeners();
                // checkBoxCheckedEventListener();
                };

        form.addEventListener("submit", logEventAndAddToArray);


        // render();

        loadFromLocalStorageToDo();
        loadFromLocalStorageDone();
       
        ///////////////////////////////////////////////////////////////////////////////////

        
    /*
      function dragStart() {
        console.log('Event: ', 'dragstart')
        dragStartIndex = +this.closest('li').getAttribute('data-index');
        console.log(dragStartIndex);
        console.log("🚀 ~ file: index.js:163 ~ dragStart ~ dragStartIndex:", dragStartIndex)

      }

      function dragEnter(event) {
        console.log('Event: ', 'dragenter')
        this.classList.add('over');
        this.style.opacity = '1';
        event.preventDefault();
      }

      function dragLeave(event) {
        console.log('Event: ', 'dragleave')
        this.classList.remove('over');
        event.preventDefault();
        

      }

      function dragOver(event) {
        event.preventDefault();
        document.body.style.cursor = 'grab';
        console.log('Event: ', 'dragover')
        
        

      }

      function dragDrop() {
        console.log('Event: ', 'drop')
        const dragEndIndex = +this.getAttribute('data-index');
        console.log(dragEndIndex);
        console.log("🚀 ~ file: index.js:184 ~ dragDrop ~ dragEndIndex:", dragEndIndex)
        swapItems(dragStartIndex, dragEndIndex);

        this.classList.remove('over');
      }

      function swapItems(fromIndex, toIndex) {
        const domElementsli = document.querySelectorAll('#to-do-list-ul li');
        console.log(domElementsli);
        console.log("🚀 ~ file: index.js:195 ~ swapItems ~ domElementsli:", domElementsli);
        const itemOne = domElementsli[fromIndex].querySelector('.draggable');
        const itemTwo = domElementsli[toIndex].querySelector('.draggable');
        console.log(itemOne, itemTwo);
        console.log("🚀 ~ file: index.js:196 ~ swapItems ~ itemOne, itemTwo:", itemOne, itemTwo)

        domElementsli[fromIndex].appendChild(itemTwo);
        domElementsli[toIndex].appendChild(itemOne); 
      }

      function addEventListeners() {
        const draggables = document.querySelectorAll('.draggable');
        const dragListItems = document.querySelectorAll('#to-do-list-ul li');
        


        draggables.forEach(draggable => {
            console.log(draggable)
            console.log("🚀 ~ file: index.js:205 ~ addEventListeners ~ draggable:", draggable)
          draggable.addEventListener('dragstart', dragStart);
          
        })

        


        dragListItems.forEach(item => {
          item.addEventListener('dragover', dragOver)
          item.addEventListener('drop', dragDrop)
          item.addEventListener('dragenter', dragEnter)
          item.addEventListener('dragleave', dragLeave)
        })
      };

      */

      ////////////////////////////////////////////////////////
      
      /* function changePElementWhenChecked (inputItemCheckLi, checkboxItem) {
        const paragraph = inputItemCheckLi.querySelector('p');
        if (checkboxItem.checked) {
          paragraph.classList.add('checked');
        } else {
          paragraph.classList.remove('checked');
        }

        /*const dataIndex = inputItemCheckLi.getAttribute('data-index');
        listItems[dataIndex].checked = checkboxItem.checked;
        saveToLocalStorageToDo();
        loadFromLocalStorageToDo();
        renderToDo();
        // changePElementWhenChecked(); 
      };
      
      function checkBoxCheckedEventListener() {
      
      const checkboxes = document.querySelectorAll('#to-do-list-ul li');
      
      checkboxes.forEach(inputItemCheckLi => {
        
        console.log(inputItemCheckLi)
        let checkboxItem = inputItemCheckLi.querySelector('.form-check-input');
        console.log(`These are the checkbox items:`, checkboxItem);
        checkboxItem.addEventListener('change', () => changePElementWhenChecked(inputItemCheckLi, checkboxItem));
        
      })
    }

   */
/*
      // Select all elements with the class "editButton"
  const editButtons = document.querySelectorAll('.editButton');
  
  // CHAT GPT OLD 
  // Add click event listener to each "edit" button
  editButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      console.log(`Eventlistener editbutton`)
      // Get the parent <li> element
      let listItemUpdate = button.closest('.to-do-list-il');
      console.log(listItemUpdate);

      // Get the <p> element inside the <li>
      let paragraphUpdateDOM = listItemUpdate.querySelector('p');
      let paragraphUpdate = listItemUpdate.querySelector('p').innerHTML;
      console.log(paragraphUpdate);

      // Create an input element
      const inputElementUpdate = document.createElement('input');
      inputElementUpdate.type = 'text';
      inputElementUpdate.value = paragraphUpdate;
      console.log(inputElementUpdate.value);
      console.log(inputElementUpdate);



      let parentElementOfNodeOfParagraph = paragraphUpdateDOM.parentNode;
      console.log(parentElementOfNodeOfParagraph);

      // Replace the <p> element with the input element
      parentElementOfNodeOfParagraph.replaceChild(inputElementUpdate, paragraphUpdateDOM);

      // Focus on the input element
      inputElementUpdate.focus();

      inputElementUpdate.addEventListener('keypress', function (event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === 'Enter') {
            // Update the <p> content with the input value
            paragraphUpdateDOM.textContent = inputElementUpdate.value;
    
            // Replace the input element with the <p> element
            parentElementOfNodeOfParagraph.replaceChild(paragraphUpdateDOM, inputElementUpdate);
        }
    });

      // Add blur event listener to handle updating the value when the input loses focus
      inputElementUpdate.addEventListener('blur', function () {
        // Update the <p> content with the input value
        paragraphUpdateDOM.textContent = inputElementUpdate.value;

        // Replace the input element with the <p> element
        parentElementOfNodeOfParagraph.replaceChild(paragraphUpdateDOM, inputElementUpdate);

        const index = parseInt(listItemUpdate.getAttribute('data-index'));
        listItems[index] = inputElementUpdate.value;

        // Render the to-do list with the updated array
        

        // Save the updated listItems array to local storage
        saveToLocalStorageToDo();
        loadFromLocalStorageDone();
        renderToDo();
      });


    });
    /*listItems = listItems.filter(i => i.title !== toDoThing.title);
    saveToLocalStorageToDo();
    loadFromLocalStorageToDo();
    saveToLocalStorageDone();
    loadFromLocalStorageDone();
    renderToDo();  // Update the to-do list UI
    renderDone();  // Update the done list UI 
  });

  */ 



  



        





