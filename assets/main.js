const show = document.getElementById('show');
const pass = document.getElementById('pass');


show.addEventListener('change', (e) => {
    pass.type = show.checked ? 'text' : 'password';
})
