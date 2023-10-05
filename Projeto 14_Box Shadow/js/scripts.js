// * Classes

class BoxShadowGenerator {
	constructor(
		horizontal,
		horizontalRef,
		vertical,
		verticalRef,
		blur,
		blurRef,
		spread,
		spreadRef,
		shadowColor,
		shadowColorRef,
		opacity,
		opacityRef,
		inset,
		previewBox,
		rule,
		webkitRule,
		mozRule,
		bgColor,
		bgColorRef,
		bgBox,
		boxColor,
		boxColorRef,
		box
	) {
		this.horizontal = horizontal;
		this.horizontalRef = horizontalRef;
		this.vertical = vertical;
		this.verticalRef = verticalRef;
		this.blur = blur;
		this.blurRef = blurRef;
		this.spread = spread;
		this.spreadRef = spreadRef;
		this.shadowColor = shadowColor;
		this.shadowColorRef = shadowColorRef;
		this.opacity = opacity;
		this.opacityRef = opacityRef;
		this.inset = inset;
		this.insetRef = inset.checked;
		this.previewBox = previewBox;
		this.rule = rule;
		this.webkitRule = webkitRule;
		this.mozRule = mozRule;
		this.bgColor = bgColor;
		this.bgColorRef = bgColorRef;
		this.bgBox = bgBox;
		this.boxColor = boxColor;
		this.boxColorRef = boxColorRef;
		this.box = box;
	}
	initialize() {
		this.horizontalRef.value = this.horizontal.value;
		this.verticalRef.value = this.vertical.value;
		this.blurRef.value = this.blur.value;
		this.spreadRef.value = this.spread.value;
		this.shadowColorRef.value = this.shadowColor.value;
		this.opacityRef.value = this.opacity.value;
		this.bgColorRef.value = this.bgColor.value;
		this.boxColorRef.value = this.boxColor.value;
		this.bgColorRef.value = this.bgColor.value;

		this.applyRule();
		this.showRule();
		this.changeBox();
	}

	// Aplica a regra definida na pré-visualização
	applyRule() {
		const rgbValue = this.hexToRgb(this.shadowColorRef.value);

		const shadowRule = `${this.insetRef ? "inset" : ""} ${this.horizontalRef.value}px ${
			this.verticalRef.value
		}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbValue}, ${
			this.opacityRef.value
		})`;
		this.previewBox.style.boxShadow = shadowRule;
		this.currentRule = shadowRule;
	}

	// Escreve a regra na rule-area
	showRule() {
		this.rule.innerText = this.currentRule;
		this.webkitRule.innerText = this.currentRule;
		this.mozRule.innerText = this.currentRule;
	}

	// Atualiza os valores da regra
	updateValue(type, value) {
		switch (type) {
			case "horizontal":
				this.horizontalRef.value = value;
				this.horizontal.value = this.horizontalRef.value;
				break;
			case "vertical":
				this.verticalRef.value = value;
				this.vertical.value = this.verticalRef.value;
				break;
			case "blur":
				this.blurRef.value = value;
				this.blur.value = this.blurRef.value;
				break;
			case "spread":
				this.spreadRef.value = value;
				this.spread.value = this.spreadRef.value;
				break;
			case "shadowColor":
				this.shadowColorRef.value = value;
				this.shadowColor.value = this.shadowColorRef.value;
				break;
			case "spread":
				this.spreadRef.value = value;
				this.spread.value = this.spreadRef.value;
				break;
			case "opacity":
				this.opacityRef.value = value;
				this.opacity.value = this.opacityRef.value;
				break;
			case "inset":
				this.insetRef = value;
				break;
			case "bgColor":
				this.bgColorRef.value = value;
				this.bgColor.value = this.bgColorRef.value;
				this.changeBox();
				break;
			case "boxColor":
				this.boxColorRef.value = value;
				this.boxColor.value = this.boxColorRef.value;
				this.changeBox();
				break;
		}
		this.applyRule();
		this.showRule();
	}

	hexToRgb(hex) {
		return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
			("0x" + hex[5] + hex[6]) | 0
		}`;
	}

	// Atualiza as cores da pré-visualização
	changeBox() {
		this.bgBox.style.backgroundColor = this.bgColor.value;
		this.box.style.backgroundColor = this.boxColor.value;
	}
}

// * Seleção de elementos

const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const inset = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const rules = document.querySelector("#rules");
const copyBtn = document.querySelector("#copy-btn");

const shadowColor = document.querySelector("#shadow-color");
const shadowColorRef = document.querySelector("#shadow-color-value");
const bgColor = document.querySelector("#bg-color");
const bgColorRef = document.querySelector("#bg-color-value");
const boxColor = document.querySelector("#box-color");
const boxColorRef = document.querySelector("#box-color-value");
const box = document.querySelector("#box");
const bgBox = document.querySelector("#bg-box");

// *Funções

// *Inicialização

const boxShadow = new BoxShadowGenerator(
	horizontal,
	horizontalRef,
	vertical,
	verticalRef,
	blur,
	blurRef,
	spread,
	spreadRef,
	shadowColor,
	shadowColorRef,
	opacity,
	opacityRef,
	inset,
	previewBox,
	rule,
	webkitRule,
	mozRule,
	bgColor,
	bgColorRef,
	bgBox,
	boxColor,
	boxColorRef,
	box
);
boxShadow.initialize();

// *Eventos

horizontal.addEventListener("input", (e) => {
	boxShadow.updateValue("horizontal", e.target.value);
});
horizontalRef.addEventListener("input", (e) => {
	boxShadow.updateValue("horizontal", e.target.value);
});
vertical.addEventListener("input", (e) => {
	boxShadow.updateValue("vertical", e.target.value);
});
verticalRef.addEventListener("input", (e) => {
	boxShadow.updateValue("vertical", e.target.value);
});
blur.addEventListener("input", (e) => {
	boxShadow.updateValue("blur", e.target.value);
});
blurRef.addEventListener("input", (e) => {
	boxShadow.updateValue("blur", e.target.value);
});
spread.addEventListener("input", (e) => {
	boxShadow.updateValue("spread", e.target.value);
});
spreadRef.addEventListener("input", (e) => {
	boxShadow.updateValue("spread", e.target.value);
});
shadowColor.addEventListener("input", (e) => {
	boxShadow.updateValue("shadowColor", e.target.value);
});
shadowColorRef.addEventListener("input", (e) => {
	boxShadow.updateValue("shadowColor", e.target.value);
});
opacity.addEventListener("input", (e) => {
	boxShadow.updateValue("opacity", e.target.value);
});
opacityRef.addEventListener("input", (e) => {
	boxShadow.updateValue("opacity", e.target.value);
});
inset.addEventListener("input", (e) => {
	boxShadow.updateValue("inset", e.target.checked);
});
bgColor.addEventListener("input", (e) => {
	boxShadow.updateValue("bgColor", e.target.value);
});
bgColorRef.addEventListener("input", (e) => {
	boxShadow.updateValue("bgColor", e.target.value);
});
boxColor.addEventListener("input", (e) => {
	boxShadow.updateValue("boxColor", e.target.value);
});
boxColorRef.addEventListener("input", (e) => {
	boxShadow.updateValue("boxColor", e.target.value);
});

copyBtn.addEventListener("click", () => {
	const copiedRules = rules.innerText.replace(/^\s*\n/gm, "");
	navigator.clipboard.writeText(copiedRules).then(() => {
		copyBtn.innerHTML = "Copiado!";
		setTimeout(() => {
			copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar';
		}, 2000);
	});
});
