// alert('1');
let usuario = {};
localStorage.setItem('user', JSON.stringify(usuario));

const openPage = document.getElementById('open_page');

// funcion para el inicio de sesion
const abrirPagina = (e) => {
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

if (window.location.href.indexOf('principal') > 0) {
  let usuarioObtenido = JSON.parse(localStorage.getItem('user'));
  console.log(usuarioObtenido.name);
  if (usuarioObtenido.name) {
    console.log(usuarioObtenido);
  } else {
    window.location.assign('../index.html');
  };
} else {
  openPage.addEventListener('click', abrirPagina);
};