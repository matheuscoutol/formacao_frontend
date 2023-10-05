//Seleção de Elementos

const btn = document.querySelector('#btn');
const form = document.querySelector('#form');
const mainContainer = document.querySelector('.main-container');
const qrcodeContainer = document.querySelector('#qrcode-container');
const qrcodeImg = document.querySelector('#qrcode-container img');
const textInput = document.querySelector('#text');

//Funções
function generateQrCode() {
  const textInputValue = textInput.value;
  if (!textInputValue) return;
  btn.innerHTML = 'Gerando Código...';
  qrcodeImg.src =
    'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
    textInputValue;
  qrcodeImg.addEventListener('load', () => {
    mainContainer.classList.add('active');
    btn.innerHTML = 'Código Criado!';
  });
}

//Eventos
btn.addEventListener('click', e => {
  e.preventDefault();
  generateQrCode();
});
textInput.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    generateQrCode();
  }
});

textInput.addEventListener('keyup', e => {
  if (!textInput.value) {
    mainContainer.classList.remove('active');
    btn.innerHTML = 'Gerar QR Code';
    qrcodeImg.src = '';
  }
});
