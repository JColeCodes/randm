async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-register').value.trim();
  const password = document.querySelector('#password-register').value.trim();
  const first_name = document.querySelector('#firstname-register').value.trim();
  const last_name = document.querySelector('#lastname-register').value.trim();
  const gender = document.querySelector('#genders').value.trim();
  const sexual_preference = document
    .querySelector('#sexual-preference')
    .value.trim();
  const pronouns = document.querySelector('#pronouns').value.trim();
  const dob = document.querySelector('#birthday-register').value.trim();
  const bio = document.querySelector('#bio').value.trim();

  const birthday = Date.parse(dob);

  function calculate_age(dob) {
    const diff_ms = Date.now() - dob;
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const age = calculate_age(dob);

  if (age < 18) {
    alert('Not of age!');
  } else if (first_name && last_name && email && password && age > 18) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        bio,
        gender,
        sexual_preference,
        pronouns,
        birthday,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.register-form')
  .addEventListener('submit', signupFormHandler);
