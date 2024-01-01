import './style.css'

document.querySelector('#app').innerHTML = `
  <header>
    <h1>Spli<br>tter</h1>
  </header>
  <main>
    <form>
      <fieldset id="calc">
        <label for="bill">Bill</label><br>
        <input type="number" id="bill" name="bill" placeholder="0"><br>
        <label for="tip">Select Tip %</label><br>
        <ul>
          <li>
            <input type="radio" id="tip1" name="tip" class="5">
            <label for="tip1">5%</label>
          </li>
          <li>
            <input type="radio" id="tip2" name="tip" class="10">
            <label for="tip2">10%</label>
          </li>
          <li>
            <input type="radio" id="tip3" name="tip" class="15">
            <label for="tip3">15%</label>
          </li>
          <li>
            <input type="radio" id="tip4" name="tip" class="25">
            <label for="tip4">25%</label>
          </li>
          <li>
            <input type="radio" id="tip5" name="tip" class="40">
            <label for="tip5">40%</label>
          </li>
          <li>
            <input type="number" id="tip6" name="tip" placeholder="Custom">
          </li>
        </ul><br>
        <label for="ppl">Number of People <span></span></label><br>
        <input type="number" id="ppl" name="ppl" placeholder="0">
      </fieldset>
      <fieldset id="result">
        <div>
          <label>Tip Amount<span> / person</span></label>
          <span class='amount'>$0.00</span>
        </div><br>
        <div>
          <label>Total<b>___</b><span> / person</span></label>
          <span class='amount'>$0.00</span>
        </div><br><br>
        <input id="sub" type="button" value="Reset" disabled>
      </fieldset>
    </form>
  </main>
`

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
      tip.innerHTML = '$' + (Number(bill.value) * percent / Number(ppl.value)) + '.00';
      total.innerHTML = '$' + ((Number(bill.value) * percent + Number(bill.value)) / Number(ppl.value)) + '.00';
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
  setTimeout(() => {
    tipr = tip.innerHTML.slice(0, tip.innerHTML.indexOf(".") + 3);
    totalr = total.innerHTML.slice(0, total.innerHTML.indexOf(".") + 3);
    tip.innerHTML = tipr;
    total.innerHTML = totalr;
  }, 0)
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
    tip.innerHTML = '$' + (Number(bill.value) * percent / Number(ppl.value)) + '.00';
    total.innerHTML = '$' + ((Number(bill.value) * percent + Number(bill.value)) / Number(ppl.value)) + '.00';
    sub.disabled = false;
  }
  else {
    tip.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
    sub.disabled = true;
  }
}