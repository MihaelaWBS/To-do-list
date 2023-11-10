document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("toreadform");
    const toReadList = document.getElementById("toreadlist");

    // Loads what i´ve saved in localStorage when the page loads
    loadBooks();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const bookInput = document.getElementById("book");
        const bookName = bookInput.value.trim(); //removing extra space from begining or end

        if (bookName === "") {
            return;
        }

        const listItem = createBookListItem(bookName);
        toReadList.appendChild(listItem);
        bookInput.value = "";

        // Save the book list to localStorage
        saveBooks();
    });

    toReadList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            deleteBookListItem(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains("update-button")) {
            updateBookListItem(e.target.parentElement.parentElement);
        }
    });

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

    function deleteBookListItem(listItem) {
        listItem.classList.add("deleted"); // Add the "deleted" class to the list item
        setTimeout(function () {
            listItem.remove(); // Remove the list item after a delay (you can adjust the delay as needed)
            // Save the updated book list to localStorage
            saveBooks();
        }, 1000); // 1000 milliseconds (1 second) delay
    }

    function updateBookListItem(listItem) {
        const bookName = prompt("Update book name:", listItem.querySelector(".book-title").textContent);
        if (bookName !== null) {
            listItem.querySelector(".book-title").textContent = bookName;
            // Save the updated book list to localStorage
            saveBooks();
        }
    }

    function saveBooks() {
        const books = [];
        const bookItems = toReadList.querySelectorAll("li .book-title");
        bookItems.forEach((item) => {
            books.push(item.textContent);
        });
        localStorage.setItem("bookList", JSON.stringify(books));
    }

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
