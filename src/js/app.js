

document.querySelector('.header__form').addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log("Se hizo click pero no reinicio la pagina");

    const textarea = document.querySelector('.form__text');
    console.log(textarea.value);
    const text = textarea.value.trim(); //Captura el texto sin espacios extra
    
    if(text === '') return;

    const task = {
        Texto: textarea.value.trim(),
        Checked : false
    };

    //Obtiene las tareas existentes de local Storage y las almacena en un array
    let tasks = obtenerTareas()

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

    let tasks = obtenerTareas();

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

        const taskCheckedHTML = `
        <div class="list__tarea">
                    <div class="tarea__checkbox">
                        <i class="fa-regular fa-square-check checkbox"></i>
                    </div>
                    <p class="tarea__text tarea__text--checked">${task.Texto}</p>
                    <div class="tarea__botones">
                        <div class="tarea__boton editar"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div class="tarea__boton eliminar"><i class="fa-regular fa-trash-can"></i></div>
                    </div>
        </div>`;

        if(task.Checked == false){

            tareasGuardadas.insertAdjacentHTML('beforeend', taskHTML);
        } else {
            tareasGuardadas.insertAdjacentHTML('beforeend', taskCheckedHTML);
        }
    });
}

document.querySelector('.main__list').addEventListener('click', (event) => {

    let tasks = obtenerTareas();

    if(event.target.closest('.eliminar')){
        const tarea = event.target.closest('.list__tarea');
        const textTarea = tarea.querySelector('.tarea__text').textContent;
        
        eliminarTarea(textTarea);
        event.target.closest('.list__tarea').remove();
    }

    if(event.target.classList.contains('checkbox')){
        const traeElElemnto = event.target.closest('.list__tarea');
        const textarea = traeElElemnto.querySelector('.tarea__text');

        tasks.forEach(task => {
            if(task.Texto === textarea.textContent){
                task.Checked =!task.Checked;
            }
        });

        event.target.classList.toggle('fa-square');
        event.target.classList.toggle('fa-square-check');

        textarea.classList.toggle('tarea__text--checked');

        guardarTareas(tasks);

    }

    if (event.target.closest('.editar')) {
        const tareaElemento = event.target.closest('.list__tarea');
        const textoElemento = tareaElemento.querySelector('.tarea__text');
        let tasks = obtenerTareas();
    
        // Crear un input con el mismo texto actual
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('tarea__editar');
        input.value = textoElemento.textContent.trim();
        input.classList.add('tarea__input');
        
        // Reemplazar el texto con el input
        tareaElemento.replaceChild(input, textoElemento);
        input.focus();
    
        // Función para guardar cambios
        const guardarEdicion = () => {
            const nuevoTexto = input.value.trim();
            if (nuevoTexto === '') return; // Evitar que se guarde vacío
    
            // Buscar y actualizar la tarea en el array
            tasks.forEach(task => {
                if (task.Texto === textoElemento.textContent.trim()) {
                    task.Texto = nuevoTexto;
                }
            });
    
            // Guardar cambios en localStorage
            guardarTareas(tasks);
    
            // Reemplazar input con el nuevo texto
            const nuevoTextoElemento = document.createElement('p');
            nuevoTextoElemento.textContent = nuevoTexto;
            nuevoTextoElemento.classList.add('tarea__text');
            if (tareaElemento.querySelector('.tarea__text--checked')) {
                nuevoTextoElemento.classList.add('tarea__text--checked'); // Mantener tachado si estaba
            }
    
            tareaElemento.replaceChild(nuevoTextoElemento, input);
        };
    
        // Guardar cuando el usuario presione Enter o salga del input
        input.addEventListener('blur', guardarEdicion);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                input.blur(); // Llama a guardarEdicion automáticamente
            }
        });
    }
});

function obtenerTareas(){
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function guardarTareas(tareas){
    localStorage.setItem('tasks', JSON.stringify(tareas));
}

function eliminarTarea(textTarea){
    let tareas = obtenerTareas();
    tareas = tareas.filter(task => task.Texto!== textTarea);
    guardarTareas(tareas);
    mostrarTareas();
}

window.onload = mostrarTareas();

