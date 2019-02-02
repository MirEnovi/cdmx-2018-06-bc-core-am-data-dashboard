// alert('1');

if (window.location.href.indexOf('principal') === -1 && window.location.href.indexOf('index') === -1) {
  window.location.assign('index.html');
}

const openPage = document.getElementById('open_page');
const exit = document.getElementById('exit');

// funcion para el inicio de sesion
const login = (e) => {
  event.preventDefault(e);
  const user = document.getElementById('name').value;
  const loginUser = document.getElementById('login').value;
  if (user === 'admin' && loginUser === '123admin') {
    let usuario = {
      name: 'Training Manager',
      correo: 'tmanager@laboratoria.com'
    };
    localStorage.setItem('user', JSON.stringify(usuario));
    window.location.assign('./view/principal.html');
  } else {
    alert('Revisa bien tus datos');
  }
};

// fin de sesion;
const logout = (e) => {
  event.preventDefault(e);
  window.location.assign('../index.html');
}


// navegación 
if (window.location.href.indexOf('principal') > 0) {
  let usuarioObtenido = JSON.parse(localStorage.getItem('user'));
  console.log(usuarioObtenido.name);
  if (usuarioObtenido.name) {
    console.log(usuarioObtenido);
  } else {
    window.location.assign('../index.html');
  };
} else if (window.location.href.indexOf('index') > 0) {
  let usuario = {};
  localStorage.setItem('user', JSON.stringify(usuario));
  openPage.addEventListener('click', login);
};


exit.addEventListener('click', logout);