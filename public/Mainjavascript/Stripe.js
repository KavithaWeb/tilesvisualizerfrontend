const stripe = Stripe('sk_test_51NTfHrSBEBPKn6D4eMcuXhSTNMITcqi3VUMJQzW7GP9ddtGRirxNPeXMmd4cZANaIGMwn5EoIXsL1bQTIpQw4QJk00LVRE1lmA');

// Create a payment token and call the server-side endpoint
async function handlePayment() {
  // Get the payment details from the user
  const amount = 1000; // Example amount in cents
  const currency = 'usd';
  
  // Create a payment token
  const { token, error } = await stripe.createToken('card');
  
  if (error) {
    // Handle token creation error
    console.error(error);
    return;
  }
  
  // Send the payment request to the server
  const response = await fetch('http://localhost:8080/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount,
      currency: currency,
      token: token.id,
      description: 'Payment description',
    }),
  });
  
  if (response.ok) {
    // Payment successful
    const result = await response.text();
    console.log(result);
  } else {
    // Payment failed
    console.error('Payment failed');
  }
}

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  handlePayment();
});