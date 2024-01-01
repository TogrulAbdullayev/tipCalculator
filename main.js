let inputs = document.querySelectorAll('main > form > #calc > input');
let radios = document.querySelectorAll('main > form > #calc > ul > li > input');
let [bill, ppl] = inputs;
let [tip1, tip2, tip3, tip4, tip5, tip6] = radios;
let all = Array.from(inputs).concat(Array.from(radios));
let [tip, total] = document.querySelectorAll(".amount");
let percent = '';
let calc = false;
let sub = document.getElementById('sub');
let tipr;
let totalr;

sub.addEventListener("click", (e) => {
  radios.forEach((el) => {
    if(el.id != 'tip6') {
      el.checked = false;
    }
    else {
      el.value = '';
    }
  })
  inputs.forEach((el) => {
    el.value = '';
  })
  tip.innerHTML = '$0.00';
  total.innerHTML = '$0.00';
  sub.disabled = true;
  percent = '';
})

let error = document.querySelector('label[for=ppl] > span');
ppl.addEventListener("input", (e) => {
  if(ppl.value !== '' && ppl.value.split("").filter((x) => x == 0).length === ppl.value.length) {
    error.innerHTML = "Can't be zero";
    ppl.style.outlineColor = 'red';
    ppl.style.caretColor = 'red';
    ppl.style.borderStyle = 'solid';
    ppl.style.borderWidth = '2px';
    ppl.style.borderColor = 'red';
  }
  else {
    error.innerHTML = '';
    ppl.style.outlineColor = 'hsl(172, 67%, 45%)';
    ppl.style.caretColor = 'hsl(172, 67%, 45%)';
    ppl.style.borderColor = 'transparent';
  }
})

radios.forEach((e) => {
  e.addEventListener("input", check);
})

tip6.addEventListener("focus", (e) => {
  radios.forEach((el) => {
    if(el.id != 'tip6') {
      el.checked = false;
    }
  })
  if(e.target.value == '') {
    percent = '';
    tip.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
    sub.disabled = true;
  }
  else {
    percent = Number(e.target.value) / 100;
    if(calc) {
      tip.innerHTML = '$' + (Number(bill.value) * percent / Number(ppl.value)).toFixed(2);
      total.innerHTML = '$' + ((Number(bill.value) * percent + Number(bill.value)) / Number(ppl.value)).toFixed(2);
      sub.disabled = false;
    }
    else {
      tip.innerHTML = '$0.00';
      total.innerHTML = '$0.00';
      sub.disabled = true;
    }
  }
})

tip6.addEventListener("focus", validate);

inputs.forEach((e) => {
  e.addEventListener("input", validate);
});

radios.forEach((e) => {
  e.addEventListener("input", validate);
})

all.forEach((e) => {
  e.addEventListener("input", calculate);
})

function validate() {
  if(bill.value != '' && String(percent) != '' && ppl.value != '' && error.innerHTML == '') {
    calc = true;
  }
  else {
    calc = false;
  }
}

function check(e) {
  if(e.target.id != 'tip6') {
    percent = Number(e.target.className) / 100;
  }
  else {
    if(e.target.value == '') {
      percent = '';
    }
    else {
      percent = Number(e.target.value) / 100;
    }
  }
}

function calculate(e) {
  if(calc) {
    tip.innerHTML = '$' + (Number(bill.value) * percent / Number(ppl.value)).toFixed(2);
    total.innerHTML = '$' + ((Number(bill.value) * percent + Number(bill.value)) / Number(ppl.value)).toFixed(2);
    sub.disabled = false;
  }
  else {
    tip.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
    sub.disabled = true;
  }
}