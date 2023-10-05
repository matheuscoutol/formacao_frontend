// Declarações de variáveis

const backBtn = document.querySelector("#back-btn");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const formContainer = document.querySelector("#form-container");
const heightInput = document.querySelector("#height");
const imcNumberSpan = document.querySelector("#imc-number span");
const imInfoSpan = document.querySelector("#imc-info span");
const imcTable = document.querySelector("#imc-table");
const resultContainer = document.querySelector("#result-container");
const validation = document.querySelector("#valid");
const weightInput = document.querySelector("#weight");

import { imcData } from "./imc.js";

// Funções

function createTable(data, table) {
	data.forEach((item) => {
		const div = document.createElement("div");
		div.classList.add("table-data");

		const classification = document.createElement("p");
		classification.innerText = item.classification;

		const info = document.createElement("p");
		info.innerText = item.info;

		const obesity = document.createElement("p");
		obesity.innerText = item.obesity;

		div.appendChild(classification);
		div.appendChild(info);
		div.appendChild(obesity);

		table.appendChild(div);
	});
}

function imcCalc(height, weight) {
	let imcResult = weight / (height / 100) ** 2;
	return imcResult.toFixed(1);
}

function imcInfo(data, result) {
	for (let i = 0; i < data.length; i++) {
		if (result >= data[i].min && result <= data[i].max) {
			let info = data[i].info;
			return info;
		}
	}
}

function changeContainer(show, hide) {
	hide.style.display = "none";
	show.style.display = "flex";
}

function clearInput(input) {
	input.value = "";
}

function validDigits(text) {
	return text.replace(/[^0-9,]/g, "");
}

function infoColor(info, el) {
	switch (info) {
		case "Magreza":
			el.style.color = "#dbce12";
			break;
		case "Normal":
			el.style.color = "#12db34";
			break;
		case "Sobrepeso":
			el.style.color = "#dbce12";
			break;
		case "Obesidade":
			el.style.color = "#db6212";
			break;
		case "Obesidade grave":
			el.style.color = "#db1912";
			break;
	}
}

// Init

createTable(imcData, imcTable);

// Eventos

[heightInput, weightInput].forEach((el) => {
	el.addEventListener("input", (e) => {
		const updatedValue = validDigits(e.target.value);
		e.target.value = updatedValue;
	});
});

calcBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (!heightInput.value || !weightInput.value) return;

	const weightValue = +weightInput.value.replace(",", ".");
	const heightValue = +heightInput.value.replace(",", ".");
	let calcResult = imcCalc(heightValue, weightValue);

	if (isNaN(calcResult)) {
		//se o resultado não for válido (NaN), pede para reinserir os dados
		clearInput(heightInput);
		clearInput(weightInput);
		validation.style.opacity = "1";
	} else {
		validation.removeAttribute("style");

		imcNumberSpan.innerText = calcResult;

		let info = imcInfo(imcData, calcResult);
		imInfoSpan.innerText = info;

		infoColor(info, imInfoSpan);
		infoColor(info, imcNumberSpan);
		changeContainer(resultContainer, formContainer);
	}
});

clearBtn.addEventListener("click", (e) => {
	e.preventDefault();
	clearInput(heightInput);
	clearInput(weightInput);
});

backBtn.addEventListener("click", (e) => {
	changeContainer(formContainer, resultContainer);
	clearInput(heightInput);
	clearInput(weightInput);
});
