/**
 * This code snippet is a JavaScript function that handles the display and manipulation of a list of books.
 * It uses the DOM API to interact with the HTML elements on the page and updates the UI accordingly.
 * The function listens for the 'DOMContentLoaded' event to ensure that the HTML has finished loading before executing.
 * It initializes variables to store the list of books, the count of uncompleted books, and the count of completed books.
 * The function provides several helper functions to add, delete, and move books, as well as functions to save and load the list of books from local storage.
 * The displayBooks function is called to render the books on the page.
 * The addBook function is called when the user submits the form to add a new book.
 * The deleteBook function is called when the user clicks the delete button for a book to remove it from the list.
 * The moveBookToBelumDibaca function is called when the user clicks the move button for a completed book to change its completion status to false.
 * The moveBookToSudahDibaca function is called when the user clicks the move button for an uncompleted book to change its completion status to true.
 * The saveToLocalStorage function is called to store the list of books in the browser's local storage.
 * The loadFromLocalStorage function is called to retrieve the list of books from the local storage and update the counts.
 * The generateID function is called to generate a unique ID for each book.
 * The function also adds event listeners to the form submission and delete buttons to trigger the corresponding functions.
 * Finally, the loadFromLocalStorage function is called to load the initial list of books from the local storage.
 */
document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('bookForm');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const yearInput = document.getElementById('year');
    const isCompleteInput = document.getElementById('isComplete');
    const uncompleted = document.getElementById('uncompleted');
    const completed = document.getElementById('completed');
    let books = [];
    let countUncompleted = 0;
    let countCompleted = 0;

    function displayBooks() {
        uncompleted.innerHTML = '';
        completed.innerHTML = '';

        books.forEach((book, index) => {
            const col = document.createElement('div');
            col.classList.add('col-6', 'ps-1', 'mt-3');

            const card = document.createElement('div');
            card.classList.add('card');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const createAndAppendElement = (elementType, className, textContent) => {
                const element = document.createElement(elementType);
                element.classList.add(className);
                element.textContent = textContent;
                cardBody.appendChild(element);
            };

            createAndAppendElement('h5', 'card-title', `Judul Buku: ${book.title}`);
            createAndAppendElement('p', 'card-text', `Penulis: ${book.author}`);
            createAndAppendElement('p', 'card-text', `Tahun: ${book.year}`);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.classList.add('btn', 'btn-danger', 'me-2', 'mb-2');
            deleteButton.addEventListener('click', function () {
                Swal.fire({
                    title: 'Apakah Anda yakin?',
                    text: 'Buku akan dihapus permanen!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Ya, hapus!',
                    cancelButtonText: 'Batal',
                    customClass: {
                        container: 'custom-swal-container'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteBook(index);
                        saveToLocalStorage();
                        Swal.fire('Terhapus!', 'Buku telah dihapus.', 'success');
                    }
                });
            });
            cardBody.appendChild(deleteButton);

            const moveButton = document.createElement('button');
            if (book.isComplete) {
                moveButton.textContent = 'Belum Selesai Dibaca';
                moveButton.classList.add('btn', 'btn-primary', 'mb-2');
                moveButton.addEventListener('click', function () {
                    moveBookToBelumDibaca(index);
                    saveToLocalStorage();
                });
                cardBody.appendChild(moveButton);
                card.appendChild(cardBody);
                col.appendChild(card);
                completed.appendChild(col);
            } else {
                moveButton.textContent = 'Selesai Dibaca';
                moveButton.classList.add('btn', 'btn-primary', 'mb-2');
                moveButton.addEventListener('click', function () {
                    moveBookToSudahDibaca(index);
                    saveToLocalStorage();
                });
                cardBody.appendChild(moveButton);
                card.appendChild(cardBody);
                col.appendChild(card);
                uncompleted.appendChild(col);
            }
        });

        document.getElementById('countUncompleted').textContent = countUncompleted > 0 ? `${countUncompleted} Buku` : '';
        document.getElementById('countCompleted').textContent = countCompleted > 0 ? `${countCompleted} Buku` : '';
    }

    function addBook(title, author, year, isComplete) {
        const newBook = {
            id: generateID(),
            title,
            author,
            year,
            isComplete,
        };
        books.push(newBook);
        isComplete ? countCompleted++ : countUncompleted++;
        displayBooks();
    }

    function deleteBook(index) {
        books[index].isComplete ? countCompleted-- : countUncompleted--;
        books.splice(index, 1);
        displayBooks();
    }

    function moveBookToBelumDibaca(index) {
        books[index].isComplete = false;
        countCompleted--;
        countUncompleted++;
        displayBooks();
    }

    function moveBookToSudahDibaca(index) {
        books[index].isComplete = true;
        countUncompleted--;
        countCompleted++;
        displayBooks();
    }

    function saveToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    function loadFromLocalStorage() {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            books = JSON.parse(storedBooks);
            countUncompleted = books.filter(book => !book.isComplete).length;
            countCompleted = books.filter(book => book.isComplete).length;
            displayBooks();
        }
    }

    function generateID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    bookForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = titleInput.value;
        const author = authorInput.value;
        const year = parseInt(yearInput.value);
        const isComplete = isCompleteInput.checked;

        addBook(title, author, year, isComplete);
        saveToLocalStorage();

        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
        isCompleteInput.checked = false;
    });

    loadFromLocalStorage();
});
