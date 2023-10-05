// Seleção de elementos

const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicatorInput = document.querySelector("#multiplicator");
const multiplicationTable = document.querySelector("#multiplication-table");
const resultTable = document.querySelector("#result-table");
const tableTitleSpan = document.querySelector("#table-title span");

// Funções

const createTable = (number, multiplicator) => {
	//limpa o conteúdo anterior
	resultTable.innerHTML = "";

	//calcula e imprime os resultados
	for (let i = 1; i <= multiplicator; i++) {
		const result = number * i;
		const row = document.createElement("div");
		row.classList.add("row");
		resultTable.appendChild(row);
		row.innerHTML = number + " x " + i + " = " + result;
	}
	//corrige o título da tabela
	tableTitleSpan.innerHTML = number;
};

// Eventos

multiplicationForm.addEventListener("submit", (e) => {
	e.preventDefault(); //evita envio padrão
	const number = +numberInput.value;
	const multiplicator = +multiplicatorInput.value;
	if (!number || !multiplicator) return; //se vazio, não executa
	createTable(number, multiplicator);
});
