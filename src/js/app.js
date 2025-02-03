

document.querySelector('.header__form').addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log("Se hizo click pero no reinicio la pagina");

    const textarea = document.querySelector('.form__text');
    console.log(textarea.value);
    const text = textarea.value.trim(); //Captura el texto sin espacios extra
    
    if(text === '') return;

    const task = {
        Texto: textarea.value.trim()
    };

    //Obtiene las tareas existentes de local Storage y las almacena en un array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    //Agrega la nueva tarea al array
    tasks.push(task);

    //Almacena el array de tareas en local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //Muestra las tareas en pantalla
    mostrarTareas();

    textarea.value = "";
    textarea.focus();
});

function mostrarTareas() {
    const tareasGuardadas = document.querySelector('.main__list');
    tareasGuardadas.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskHTML = `
        <div class="list__tarea">
                    <div class="tarea__checkbox">
                        <i class="fa-regular fa-square checkbox"></i>
                    </div>
                    <p class="tarea__text">${task.Texto}</p>
                    <div class="tarea__botones">
                        <div class="tarea__boton editar"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div class="tarea__boton eliminar"><i class="fa-regular fa-trash-can"></i></div>
                    </div>
        </div>`;

        tareasGuardadas.insertAdjacentHTML('beforeend', taskHTML);
    });
}

document.querySelector('.main__list').addEventListener('click', (event) => {
    if(event.target.closest('.eliminar')){
        const tarea = event.target.closest('.list__tarea');
        const textTarea = tarea.querySelector('.tarea__text').textContent;
        
        eliminarTarea(textTarea);
        event.target.closest('.list__tarea').remove();
    }

    if(event.target.classList.contains('checkbox')){
        const textarea = event.target.closest('.list__tarea').querySelector('.tarea__text');

        event.target.classList.toggle('fa-square');
        event.target.classList.toggle('fa-square-check');

        textarea.classList.toggle('tarea__text--checked');

    }

});

function obtenerTareas(){
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function guardarTareas(tareas){
    localStorage.setItem('tasks', JSON.stringify(tareas))
}

function eliminarTarea(textTarea){
    let tareas = obtenerTareas();
    tareas = tareas.filter(task => task.Texto!== textTarea);
    guardarTareas(tareas);
    mostrarTareas();
}

window.onload = mostrarTareas();

