document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("toreadform");
    const toReadList = document.getElementById("toreadlist");

    // Load books from localStorage when the page loads
    loadBooks();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const bookInput = document.getElementById("book");
        const bookName = bookInput.value.trim();

        if (bookName === "") {
            return;
        }

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${bookName}
            <button class="delete-button">Delete</button>
            <button class="update-button">Update</button>
        `;

        toReadList.appendChild(listItem);
        bookInput.value = "";

        // Save the book list to localStorage
        saveBooks();
    });

    toReadList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            e.target.parentElement.remove();
            // Save the updated book list to localStorage
            saveBooks();
        } else if (e.target.classList.contains("update-button")) {
            const bookName = prompt("Update book name:", e.target.parentElement.textContent);
            if (bookName !== null) {
                e.target.parentElement.textContent = bookName;
                // Save the updated book list to localStorage
                saveBooks();
            }
        }
    });

    function saveBooks() {
        const books = [];
        const bookItems = toReadList.querySelectorAll("li");
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
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${bookName}
                    <button class="delete-button">Delete</button>
                    <button class="update-button">Update</button>
                `;
                toReadList.appendChild(listItem);
            });
        }
    }
});

