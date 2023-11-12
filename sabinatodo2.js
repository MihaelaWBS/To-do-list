const createBookEle = (bookName) => {
    const listItem = document.createElement("li");
    const titleElement = document.createElement("span");
    const buttonContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    const updateButton = document.createElement("button");

    titleElement.textContent = bookName;
    deleteButton.textContent = "Delete";
    updateButton.textContent = "Update";

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(updateButton);

    listItem.appendChild(titleElement);
    listItem.appendChild(buttonContainer);

    deleteButton.addEventListener("click", () => handleBookDelete(listItem, bookName));
    updateButton.addEventListener("click", () => handleUpdate(listItem, titleElement, updateButton, bookName));

    return listItem;
};

const handleBookDelete = (listItem, bookName) => {
    books = books.filter((book) => book.title !== bookName);
    saveBooks();
    booksList.removeChild(listItem);
};

const handleUpdate = (listItem, titleElement, updateButton, oldTitle) => {
    const titleInput = document.createElement("input");
    const doneButton = document.createElement("button");

    titleInput.type = "text";
    titleInput.value = oldTitle;

    doneButton.textContent = "Done";
    doneButton.addEventListener("click", () => {
        const newTitle = titleInput.value;

        books = books.map((book) => (book.title === oldTitle ? { ...book, title: newTitle } : book));
        saveBooks();

        titleElement.textContent = newTitle;

        listItem.replaceChild(titleElement, titleInput);
        listItem.replaceChild(updateButton, doneButton);
    });

    listItem.replaceChild(titleInput, titleElement);
    listItem.replaceChild(doneButton, updateButton);
};

const render = () => {
    booksList.innerHTML = "";
    books.forEach((book) => {
        const listItem = createBookEle(book.title);
        booksList.appendChild(listItem);
    });
};

booksForm.addEventListener("submit", addBook);
loadFromLocalStorage();
