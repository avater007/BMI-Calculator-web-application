let unit = 'metric';
const $ = (id) => document.getElementById(id);

function setUnit(u) {
  unit = u;
  $('metric').setAttribute('aria-pressed', u === 'metric');
  $('imperial').setAttribute('aria-pressed', u === 'imperial');
  $('metricFields').hidden = u !== 'metric';
  $('impFields').hidden = u !== 'imperial';
  $('result').style.display = 'none';
  $('err').textContent = '';
}

function category(bmi) {
  if (bmi < 18.5) return ['Underweight', 'A BMI under 18.5 is considered underweight.'];
  if (bmi < 25)   return ['Healthy weight', 'A BMI from 18.5 to 24.9 is a healthy range.'];
  if (bmi < 30)   return ['Overweight', 'A BMI from 25 to 29.9 is considered overweight.'];
  return ['Obesity', 'A BMI of 30 or more is in the obesity range.'];
}

function calculate() {
  let heightM, weightKg;

  if (unit === 'metric') {
    heightM = parseFloat($('cm').value) / 100;
    weightKg = parseFloat($('kg').value);
  } else {
    const ft = parseFloat($('ft').value) || 0;
    const inch = parseFloat($('inch').value) || 0;
    heightM = (ft * 12 + inch) * 0.0254;
    weightKg = parseFloat($('lb').value) * 0.45359237;
  }

  if (!(heightM > 0) || !(weightKg > 0)) {
    $('err').textContent = 'Enter a height and weight greater than zero.';
    $('result').style.display = 'none';
    return;
  }

  $('err').textContent = '';
  const bmi = weightKg / (heightM * heightM);   // BMI = kg / m²
  const [name, note] = category(bmi);

  $('bmi').textContent = bmi.toFixed(1);
  $('cat').textContent = name;
  $('note').textContent = note;
  $('result').style.display = 'block';
}

$('metric').addEventListener('click', () => setUnit('metric'));
$('imperial').addEventListener('click', () => setUnit('imperial'));
$('calc').addEventListener('click', calculate);
document.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculate(); });
