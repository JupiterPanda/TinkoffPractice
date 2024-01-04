import initializeData from "./db_def.js";

let itemData = JSON.parse(localStorage.getItem("cards")) ?? [];

let selectedItemID = null;

const itemProperties = ["title", "author", "thumbnail", "description"];

const submitBtn = document.querySelector("[data-submit-button]");

const itemForm = document.forms.create;

const resetForm = () => {
    selectedItemID = null;

    itemProperties.forEach((property) => (itemForm.elements[property].value = ""));

    submitBtn.innerHTML = "Добавить";
};

const synchronizeData = () => {
    localStorage.setItem("cards", JSON.stringify(itemData));

    renderItems();
};

itemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (selectedItemID) {
        itemData = itemData.map((item) =>
            item.id === selectedItemID
                ? {
                    ...item,
                    ...itemProperties.reduce(
                        (acc, property) => ({ ...acc, [property]: itemForm.elements[property].value }),
                        {}
                    ),
                }
                : item
        );

        synchronizeData();

        resetForm();
    } else {
        const newItem = itemProperties.reduce(
            (acc, property) => ({ ...acc, [property]: itemForm.elements[property].value }),
            {}
        );

        newItem.id = Math.floor(Math.random() * 100000);

        itemData.push(newItem);

        synchronizeData();
    }
});

const setupBtn = document.querySelector("#setup");

setupBtn.addEventListener("click", () => {
    itemData = initializeData;

    synchronizeData();

    resetForm();
});

const removeItem = (event) => {
    const itemID = +event.target.dataset.id;

    itemData = itemData.filter((item) => item.id !== itemID);

    synchronizeData();

    itemID === selectedItemID && resetForm();
};

const editItem = (event) => {
    const itemID = +event.target.dataset.id;

    if (selectedItemID === itemID) {
        resetForm();

        event.target.innerHTML = "Изменить";

        return;
    }

    if (selectedItemID) {
        document.querySelector(
            `[data-edit-button][data-id="${selectedItemID}"]`
        ).innerHTML = "Изменить";
    }

    selectedItemID = itemID;

    const item = itemData.find(({ id }) => id === selectedItemID);

    if (item) {
        event.target.innerHTML = "Отмена";

        itemProperties.map((property) => (itemForm.elements[property].value = item[property]));

        submitBtn.innerHTML = "Изменить";
    }
};

const itemsContainer = document.querySelector("#root");

const renderItems = () => {
    itemsContainer.innerHTML = itemData
        .map(
            ({ id, title, author, description, thumbnail }) => `
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
                            data-id=${id}
                            data-edit-button
                            class="py-2 px-4 rounded-lg transition bg-blue-100/50 hover:bg-blue-100/80 active:bg-blue-100 focus-visible:ring outline-none"
                        >
                            Изменить
                        </button>
                        <button
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
        .forEach((btn) => btn.addEventListener("click", removeItem));

    document
        .querySelectorAll("[data-edit-button]")
        .forEach((btn) => btn.addEventListener("click", editItem));
};

renderItems();