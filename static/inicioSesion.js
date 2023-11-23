const userForm = document.querySelector("#myForm");

userForm.addEventListener('submit', async e => {
    e.preventDefault();

    const correo = userForm['usuario'].value
    const contrasenia = userForm['contrasenia'].value

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          contrasenia: contrasenia,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Éxito: redirige al usuario
            window.location.href = '/inicioSistema';
          } else {
            // Error: muestra el mensaje de error
            alert(data.error);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    //const data = await response.json()
})

