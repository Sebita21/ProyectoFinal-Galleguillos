class App {
  static data = {
    usuario: [],
    registro: [],
  };

  static initializeData() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const pass = document.getElementById('password');
    const form = document.getElementById('form-registro');
    const parrafo = document.getElementById('warning');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let warning = '';
      let entrar = false;
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      parrafo.innerHTML = '';

      if (nombre.value.length < 6) {
        warning += 'El nombre es muy corto <br>';
        entrar = true;
      }

      if (!regexEmail.test(email.value)) {
        warning += 'El email no es valido <br>';
        entrar = true;
      }

      if (pass.value.length < 8) {
        warning += 'La contraseña no es valida<br>';
        entrar = true;
      }

      if (entrar) {
        parrafo.innerHTML = warning;
      } else {
        parrafo.innerHTML = 'Enviado';
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu registro fue guardado en el SessionStorage',
          showConfirmButton: false,
          timer: 1500,
        });
        const datoUsuario = {
          nombre: nombre.value,
          email: email.value,
          pass: pass.value,
        };

        sessionStorage.setItem('datoUsuario', JSON.stringify(datoUsuario));
   
      }
    });
    let signUp = document.getElementById('signUp');
    let sigIn = document.getElementById('signIn');
    let nomInput = document.getElementById('nomInput');
    let titulo = document.getElementById('titulo');

    signIn.onclick = function () {
      nomInput.style.maxHeight = '0';
      titulo.innerHTML = 'Login';
      signUp.classList.add('disable');
      sigIn.classList.remove('disable');
    };

    signUp.onclick = function () {
      nomInput.style.maxHeight = '60px';
      titulo.innerHTML = 'Registro';
      signUp.classList.remove('disable');
      sigIn.classList.add('disable');
    };
  }

  static start() {
    App.initializeData();
  }
}

App.start();
