async function signupFormHandler(event) {
  event.preventDefault();

  // const username = document.querySelector('#username-signup').value.trim();
  // const email = document.querySelector('#email-signup').value.trim();
  // const password = document.querySelector('#password-signup').value.trim();
  const birthday = document.querySelector('#birthday-register').value.trim();

  const dob = Date.parse(birthday);

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob;
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  console.log(calculate_age(dob));
  // var age = calculate_age(new Date(BIRTHYEAR, BIRTHMONTH-1, BIRTHDATE));

  // if (username && email && password) {
  //   const response = await fetch('/api/users', {
  //     method: 'post',
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/');
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
}

document
  .querySelector('.register-form')
  .addEventListener('submit', signupFormHandler);
