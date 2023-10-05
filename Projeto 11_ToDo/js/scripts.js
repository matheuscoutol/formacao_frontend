//* Seleção de elementos

const addtaskForm = document.querySelector("#addtask-form");
const addtaskInput = document.querySelector("#addtask-input");
const addtaskBtn = document.querySelector("#addtask-btn");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-btn");
const filterSelect = document.querySelector("#filter-select");
const taskList = document.querySelector("#task-list");

//* Funções

const saveTask = (text) => {
	const taskContainer = document.createElement("div");
	taskContainer.classList.add("task-container");
	taskContainer.classList.add("todo");
	const task = document.createElement("p");
	task.innerText = text;
	taskContainer.appendChild(task);

	const taskOptions = document.createElement("div");
	taskOptions.classList.add("task-options");
	taskContainer.appendChild(taskOptions);

	const DoneBtn = document.createElement("button");
	DoneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
	DoneBtn.classList.add("done-btn");
	taskOptions.appendChild(DoneBtn);

	const editBtn = document.createElement("button");
	editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
	taskOptions.appendChild(editBtn);
	editBtn.classList.add("edit-btn");

	const deleteBtn = document.createElement("button");
	deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
	taskOptions.appendChild(deleteBtn);
	deleteBtn.classList.add("delete-btn");

	taskList.appendChild(taskContainer);
};

const searchTask = (search) => {
	const tasks = document.querySelectorAll(".task-container");

	tasks.forEach((task) => {
		const taskTitle = task.querySelector("p").innerText.toLowerCase();
		task.style.display = "flex";

		if (!taskTitle.includes(search)) {
			task.style.display = "none";
		}
	});
};

const filterTask = (filterValue) => {
	const tasks = document.querySelectorAll(".task-container");

	switch (filterValue) {
		case "all":
			tasks.forEach((task) => (task.style.display = "flex"));
			break;

		case "done":
			tasks.forEach((task) =>
				task.classList.contains("done")
					? (task.style.display = "flex")
					: (task.style.display = "none")
			);

			break;

		case "to-do":
			tasks.forEach((task) =>
				!task.classList.contains("done")
					? (task.style.display = "flex")
					: (task.style.display = "none")
			);
			break;

		default:
			break;
	}
};

//* Eventos

addtaskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const addtaskValue = addtaskInput.value;

	if (addtaskValue) {
		saveTask(addtaskValue);
	}
	addtaskInput.value = "";
});

document.addEventListener("click", (e) => {
	const targetEl = e.target;
	const parentEl = targetEl.parentElement.parentElement;
	let todoTitle;

	if (parentEl && parentEl.querySelector("p")) {
		todoTitle = parentEl.querySelector("p").innerText || "";
	}

	if (targetEl.classList.contains("done-btn")) {
		parentEl.classList.toggle("done");
		parentEl.classList.toggle("todo");
	}

	if (targetEl.classList.contains("delete-btn")) {
		parentEl.remove();
	}

	if (targetEl.classList.contains("edit-btn")) {
		targetEl.parentElement.style.display = "none";
		parentEl.querySelector("p").style.display = "none";

		const editForm = document.createElement("form");
		editForm.classList.add("edit-form");

		const editInput = document.createElement("input");
		editInput.setAttribute("type", "text");

		editInput.setAttribute("placeholder", parentEl.querySelector("p").innerHTML);
		editForm.appendChild(editInput);

		const confirmEditBtn = document.createElement("button");
		confirmEditBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
		editForm.appendChild(confirmEditBtn);

		const cancelEditBtn = document.createElement("button");
		cancelEditBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
		editForm.appendChild(cancelEditBtn);
		parentEl.appendChild(editForm);

		confirmEditBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (editInput.value) {
				parentEl.querySelector("p").innerText = editInput.value;
				editForm.remove();
				targetEl.parentElement.style.display = "flex";
				parentEl.querySelector("p").style.display = "flex";
			}
		});

		cancelEditBtn.addEventListener("click", (e) => {
			e.preventDefault();
			editForm.remove();
			targetEl.parentElement.style.display = "flex";
			parentEl.querySelector("p").style.display = "flex";
		});
	}
});
searchInput.addEventListener("keyup", (e) => {
	searchTask(e.target.value);
	filterSelect.value = "all";
});

eraseBtn.addEventListener("click", (e) => {
	e.preventDefault();
	searchInput.value = "";
	searchInput.dispatchEvent(new Event("keyup"));
});

filterSelect.addEventListener("change", (e) => {
	filterTask(e.target.value);
	searchInput.value = "";
});

//* Local Storage
