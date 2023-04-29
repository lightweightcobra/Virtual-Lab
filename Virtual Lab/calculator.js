const equationInput = document.getElementById('equation');
const gradientOutput = document.getElementById('gradient');
const divergenceOutput = document.getElementById('divergence');
const curlOutput = document.getElementById('curl');
const calculateBtn = document.getElementById('calculate-btn');

function calculate() {
	const equation = equationInput.value;

	// Calculate gradient
	const gradient = `Gradient: (${math.derivative(equation, 'x')}, ${math.derivative(equation, 'y')}, ${math.derivative(equation, 'z')})`;

	// Calculate divergence
	const divergence = `Divergence: ${math.derivative(`(${equation})`, 'x') || 0} + ${math.derivative(`(${equation})`, 'y') || 0} + ${math.derivative(`(${equation})`, 'z') || 0} = ${math.round(math.derivative(`(${equation})`, 'x') + math.derivative(`(${equation})`, 'y') + math.derivative(`(${equation})`, 'z'), 2)}`;

	// Calculate curl
	const curl = `Curl: (${math.round(math.derivative(`(${equation})`, 'z') - math.derivative(`(${equation})`, 'y'), 2)}, ${math.round(math.derivative(`(${equation})`, 'x') - math.derivative(`(${equation})`, 'z'), 2)}, ${math.round(math.derivative(`(${equation})`, 'y') - math.derivative(`(${equation})`, 'x'), 2)})`;

	// Output results
	gradientOutput.textContent = gradient;
	divergenceOutput.textContent = divergence;
	curlOutput.textContent = curl;
}

calculateBtn.addEventListener('click', calculate);
