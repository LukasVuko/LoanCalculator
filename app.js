//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1000);
});

// Calculate Results
function calculateResults() {
  console.log('Calculating...');
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value * 12);

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
