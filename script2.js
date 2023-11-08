const form = document.querySelector(
	".row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
);
const input = document.querySelector("#form1");
const tasksList = [
	{ title: "learn javascript", isDone: false, date: "20-10-2023" },
	{ title: "learn bootstrap", isDone: false, date: "21-10-2023" },
	{ title: "learn html", isDone: true, date: "22-10-2023" },
	{ title: "do sport", isDone: true, date: "23-10-2023" },
	{ title: "eat", isDone: false, date: "24-10-2023" },
];

const saveButton = document.querySelector(".save");
const getTasksButton = document.querySelector(".get-tasks");
const deleteButton = document.querySelector(".delete");
const finishedButton = document.querySelector(".finished");

const itemNoCol = document.getElementbyId("item-no");
const toDoItemCol = document.getElementbyId("to-do-item");
const statusCol = document.getElementbyId("status");
const actionsCol = document.getElementbyId("actions");
const tableHead = document.getElementbyId("t-head");
const tableRow = document.getElementbyId("t-row");





