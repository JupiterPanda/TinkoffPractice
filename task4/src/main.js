const API_BASE_URL = "http://localhost:3000";

let itemsList = [];

let selectedItemID = null;

const itemProperties = ["title", "author", "thumbnail", "description"];

const submitButton = document.querySelector("[data-submit-button]");

const itemForm = document.forms.create;

const container = document.querySelector("#root");

const loader = document.querySelector("#loader");

const startLoading = () => {
    loader.style.display = "flex";
};

const stopLoading = () => {
    loader.style.display = "none";
};

const renderItems = () => {
    container.innerHTML = itemsList
        .map(({ id, title, author, description, thumbnail }) => `
            <div tabindex="0" class="card p-10 focus-visible:ring outline-none min-h-24 shadow rounded-lg flex gap-6">
                <img
                    alt=${title}
                    src=${thumbnail}
                    class="w-28 thumbnail"
                />
                <div class="flex flex-col justify-between flex-grow gap-4">
                    <div>
                        <h2 class="font-bold text-xl">${title}</h2>
                        <p class="text-sm text-gray-600">${author}</p>
                        <p class="mt-4 text-sm text-gray-600 line-clamp-6">
                            ${description}
                        </p>
                    </div>
                    <div class="flex items-center justify-end gap-4">
                        <button
                            type="button"
                            data-id=${id}
                            data-edit-button
                            class="py-2 px-4 rounded-lg transition bg-blue-100/50 hover:bg-blue-100/80 active:bg-blue-100 focus-visible:ring outline-none"
                        >
                            Изменить
                        </button>
                        <button
                            type="button"
                            data-id=${id}
                            data-remove-button
                            class="py-2 px-4 rounded-lg transition bg-red-100/60 hover:bg-red-100/80 active:bg-red-100 focus-visible:ring outline-none"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>`
        )
        .join("");

    document
        .querySelectorAll("[data-remove-button]")
        .forEach((btn) => btn.addEventListener("click", deleteItem));

    document
        .querySelectorAll("[data-edit-button]")
        .forEach((btn) => btn.addEventListener("click", editItem));
};

const fetchInitialData = async () => {
    try {
        startLoading();

        let itemsRequest = fetch(`${API_BASE_URL}/books`);
        let authorRequest = fetch(`${API_BASE_URL}/author`);

        const result = await Promise.all([itemsRequest, authorRequest]);

        if (result.some((res) => !res.ok)) {
            console.log("Error fetching initial data");
        } else {
            [itemsRequest, authorRequest] = result;

            const itemsJSON = await itemsRequest.json();
            const { name, group } = await authorRequest.json();

            const authorContainer = document.querySelector("#author");
            authorContainer.innerHTML = `${name} ${group}`;

            itemsList = itemsJSON;

            renderItems();
        }
    } catch (error) {
        console.log(error);
    } finally {
        stopLoading();
    }
};

fetchInitialData();

const deleteItem = async (event) => {
    const id = +event.target.dataset.id;

    try {
        startLoading();

        const res = await fetch(`${API_BASE_URL}/books/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            itemsList = itemsList.filter((item) => item.id !== id);

            renderItems();

            id === selectedItemID && resetForm();
        } else {
            console.log("Error deleting item");
        }
    } catch (error) {
        console.log(error);
    } finally {
        stopLoading();
    }
};

const resetForm = () => {
    selectedItemID = null;

    itemProperties.forEach((property) => (itemForm.elements[property].value = ""));

    submitButton.innerHTML = "Добавить";
};

itemForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.innerHTML = "Загрузка...";

    let newItem = itemProperties.reduce(
        (acc, key) => ({ ...acc, [key]: itemForm.elements[key].value }),
        {}
    );

    if (selectedItemID) {
        try {
            startLoading();

            const res = await fetch(`${API_BASE_URL}/books/${selectedItemID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (res.ok) {
                itemsList = itemsList.map((item) =>
                    item.id === selectedItemID ? { ...newItem, id: selectedItemID } : item
                );

                renderItems();
            } else {
                console.log("Error updating item");
            }
        } catch (error) {
            console.log(error);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = "Добавить";
            resetForm();
            stopLoading();
        }
    } else {
        newItem.id = Math.floor(Math.random() * 100000);

        try {
            startLoading();

            const res = await fetch(`${API_BASE_URL}/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (res.ok) {
                const item = await res.json();

                itemsList.push(item);

                renderItems();
            } else {
                console.log("Error adding item");
            }
        } catch (error) {
            console.log(error);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = "Добавить";
            resetForm();
            stopLoading();
        }
    }
});

const editItem = (event) => {
    const id = +event.target.dataset.id;

    if (selectedItemID === id) {
        resetForm();

        event.target.innerHTML = "Изменить";

        return;
    }

    if (selectedItemID) {
        document.querySelector(
            `[data-edit-button][data-id="${selectedItemID}"]`
        ).innerHTML = "Изменить";
    }

    selectedItemID = id;

    const item = itemsList.find(({ id }) => id === selectedItemID);

    if (item) {
        event.target.innerHTML = "Отмена";

        itemProperties.map((property) => (itemForm.elements[property].value = item[property]));

        submitButton.innerHTML = "Изменить";
    }
};