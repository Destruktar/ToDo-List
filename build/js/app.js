document.querySelector('.header__form').addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log("Se hizo click pero no reinicio la pagina");

    const textarea = document.querySelector('.form__text');
    console.log(textarea.value);
    const text = textarea.value.trim(); //Captura el texto sin espacios extra
    
    if(text === '') return;

    const mainList = document.querySelector('.main__list');

    const tareaHTML = `
        <div class="list__tarea">
                    <div class="tarea__checkbox">
                        <i class="fa-regular fa-square checkbox"></i>
                    </div>
                    <p class="tarea__text">${text}</p>
                    <div class="tarea__botones">
                        <div class="tarea__boton editar"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div class="tarea__boton eliminar"><i class="fa-regular fa-trash-can"></i></div>
                    </div>
        </div>`;

    mainList.insertAdjacentHTML('beforeend', tareaHTML);

    textarea.value = "";
    textarea.focus();
});

document.querySelector('.main__list').addEventListener('click', (event) => {
    if(event.target.closest('.eliminar')){
        event.target.closest('.list__tarea').remove();
    }

    if(event.target.classList.contains('checkbox')){
        const textarea = event.target.closest('.list__tarea').querySelector('.tarea__text');

        event.target.classList.toggle('fa-square');
        event.target.classList.toggle('fa-square-check');

        textarea.classList.toggle('tarea__text--checked');

    }

});


