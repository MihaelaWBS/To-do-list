document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("toreadform");
    const toReadList = document.getElementById("toreadlist");

   loadBooks();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const bookInput = document.getElementById("book");
        const bookName = bookInput.value.trim(); //removing extra space from begining or end

        //Check for Empty Input
        if (bookName === "") {
            return;
        }


        //Create a new list item, append it to the to-read list, reset the input field.
        const listItem = createBookListItem(bookName);
        toReadList.appendChild(listItem);
        bookInput.value = "";

        // Save the book list to localStorage
        saveBooks();
    });

    // Adds a click event listener to the entire to-read list.
    toReadList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            deleteBookListItem(event.target.parentElement.parentElement);
        } else if (event.target.classList.contains("update-button")) {
            updateBookListItem(event.target.parentElement.parentElement);
        }
    });

    //Generate the structure for each book entry in my  to-read list.
    function createBookListItem(bookName) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="book-title">${bookName}</span>
            <div class="button-container">
                <button class="delete-button">Delete</button>
                <button class="update-button">Update</button>
            </div>
        `;
        return listItem;
    }

    //Marks the list item for deletion by adding a "deleted" class, waits for 1 min using setTimeout, removes the list item from the DOM, saves the updated book list to localStorage.
    function deleteBookListItem(listItem) {
        listItem.classList.add("deleted"); // Adds a CSS class-"deleted"- to the list item: a strike-through visual effect
        setTimeout(function () {
        listItem.remove(); 
        saveBooks();
        }, 1000); 
    }

    function updateBookListItem(listItem) {
        const bookName = prompt("Update book name:", listItem.querySelector(".book-title").textContent);
        if (bookName !== null) {
            listItem.querySelector(".book-title").textContent = bookName;
            saveBooks();
        }
    }

    //Retrieves the book titles from the to-read list, stores them in an array, converts the array to a JSON string, saves it in the browser's local storage under the key "bookList".
    function saveBooks() {
        const books = [];
        const bookItems = toReadList.querySelectorAll("li .book-title");
        bookItems.forEach((item) => {
            books.push(item.textContent);
        });
        localStorage.setItem("bookList", JSON.stringify(books));
    }

    //Function called when the page loads to populate the to-read list with the stored books: retrieves the stored book list from local storage, checks if there are stored books, converts the stored JSON string to an array, iterates over each book title, creates a new list item for each title,appends it to the to-do list on the webpage.
    function loadBooks() {
        const storedBooks = localStorage.getItem("bookList");
        if (storedBooks) {
            const books = JSON.parse(storedBooks);
            books.forEach((bookName) => {
                const listItem = createBookListItem(bookName);
                toReadList.appendChild(listItem);
            });
        }
    }
});
