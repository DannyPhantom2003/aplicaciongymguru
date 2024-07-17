/* Esperar a que el contenido del DOM esté cargado */
document.addEventListener("DOMContentLoaded", function() {
    // Mostrar la pantalla de inicio después de 3 segundos
    setTimeout(function() {
        document.getElementById("carga").style.display = "none";
        document.getElementById("inicio").style.display = "block";
    }, 3000);
});

let historyStack = [];
let loggedInUser = null;

/* Actualizar historial de navegación */
function pushHistory(screenId) {
    historyStack.push(screenId);
}

function popHistory() {
    return historyStack.pop();
}

/* Mostrar la pantalla de inicio de sesión */
function mostrarLogin() {
    ocultarTodo();
    document.getElementById("login").style.display = "block";
    pushHistory("inicio");
}

/* Mostrar la pantalla de registro por correo */
function mostrarRegistro() {
    ocultarTodo();
    document.getElementById("registroCorreo").style.display = "block";
    pushHistory("login");
}

/* Mostrar la pantalla de inicio */
function mostrarInicio() {
    ocultarTodo();
    document.getElementById("inicio").style.display = "block";
}

/* Mostrar la pantalla de registro de usuario */
function mostrarRegistroUsuario() {
    const email = document.getElementById('nuevoEmail').value;
    const password = document.getElementById('nuevoPassword').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
        document.getElementById('errorPassword').style.display = 'block';
        return;
    } else {
        document.getElementById('errorPassword').style.display = 'none';
    }

    document.getElementById('registroEmail').value = email;
    document.getElementById('registroPassword').value = password;

    ocultarTodo();
    document.getElementById("registro").style.display = "block";
    pushHistory("registroCorreo");
}

/* Manejar el inicio de sesión */
function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Enviar datos de inicio de sesión al servidor
    fetch("php/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${email}&password=${password}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            loggedInUser = data.user; // Guardar la sesión del usuario con la información completa
            ocultarTodo();
            mostrarActividades();
        } else {
            alert(data.message);
        }
    });
}

/* Manejar el registro de usuario */
function handleRegister() {
    const nombre_completo = document.getElementById("nombre_completo").value;
    const apodo = document.getElementById("apodo").value;
    const email = document.getElementById("registroEmail").value;
    const password = document.getElementById("registroPassword").value;
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;

    // Enviar datos de registro al servidor
    fetch("php/registro.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nombre_completo=${nombre_completo}&apodo=${apodo}&email=${email}&password=${password}&peso=${peso}&altura`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data.includes("exitoso")) {
            loggedInUser = {
                nombre_completo,
                apodo,
                email,
                peso,
                altura
            };
            ocultarTodo();
            mostrarActividades();
        }
    });
}

/* Mostrar la pantalla de actividades */
function mostrarActividades() {
    ocultarTodo();
    document.getElementById("actividades").style.display = "block";
    pushHistory("inicio");
}

/* Mostrar la pantalla de ejercicios según la actividad seleccionada */
function mostrarEjercicios(actividad) {
    ocultarTodo();
    document.getElementById("ejercicios").style.display = "block";
    document.getElementById("actividad-titulo").textContent = actividad;
    pushHistory("actividades");
}

/* Mostrar la pantalla de rutinas */
function mostrarRutinas() {
    ocultarTodo();
    document.getElementById("rutinas").style.display = "block";
    pushHistory("actividades");
}

/* Mostrar el perfil del usuario */
function mostrarPerfil() {
    if (loggedInUser) {
        document.getElementById("perfil-nombre").textContent = loggedInUser.nombre_completo;
        document.getElementById("perfil-apodo").textContent = loggedInUser.apodo;
        document.getElementById("perfil-email").textContent = loggedInUser.email;
        document.getElementById("perfil-peso").textContent = loggedInUser.peso;
        document.getElementById("perfil-altura").textContent = loggedInUser.altura;
        ocultarTodo();
        document.getElementById("perfil").style.display = "block";
        pushHistory("actividades");
    }
}

/* Cerrar sesión */
function cerrarSesion() {
    loggedInUser = null;
    ocultarTodo();
    mostrarInicio();
}

/* Mostrar y ocultar el menú */
function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

/* Ocultar todas las pantallas */
function ocultarTodo() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("registroCorreo").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("actividades").style.display = "none";
    document.getElementById("ejercicios").style.display = "none";
    document.getElementById("rutinas").style.display = "none";
    document.getElementById("perfil").style.display = "none";
}

/* Manejar selección de nivel de rutina */
const routines = {
    beginner: {
        day1: [
            { name: "Press de banca con mancuernas", reps: 12, sets: 3 },
            { name: "Press inclinado con mancuernas", reps: 12, sets: 3 },
            { name: "Aperturas con mancuernas", reps: 15, sets: 3 }
        ],
        day2: [
            { name: "Sentadillas", reps: 15, sets: 3 },
            { name: "Prensa de pierna", reps: 15, sets: 3 },
            { name: "Extensiones de pierna", reps: 15, sets: 3 }
        ],
        day3: [
            { name: "Jalones al pecho", reps: 12, sets: 3 },
            { name: "Remo con mancuerna", reps: 12, sets: 3 },
            { name: "Peso muerto con piernas rígidas", reps: 15, sets: 3 }
        ],
        day4: [
            { name: "Curl de bíceps con mancuernas", reps: 15, sets: 3 },
            { name: "Extensiones de tríceps en polea", reps: 15, sets: 3 },
            { name: "Press militar con mancuernas", reps: 12, sets: 3 }
        ],
        day5: [
            { name: "Crunches", reps: 20, sets: 3 },
            { name: "Elevaciones de piernas", reps: 15, sets: 3 },
            { name: "Plancha", reps: 30, sets: 3 },
            { name: "Cardio", time: 20, type: "minutes" }
        ]
    },
    intermediate: {
        day1: [
            { name: "Press de banca con barra", reps: 10, sets: 4 },
            { name: "Press inclinado con barra", reps: 10, sets: 4 },
            { name: "Aperturas con mancuernas", reps: 12, sets: 4 },
            { name: "Fondos en paralelas", reps: 10, sets: 3 }
        ],
        day2: [
            { name: "Sentadillas", reps: 12, sets: 4 },
            { name: "Prensa de pierna", reps: 12, sets: 4 },
            { name: "Extensiones de pierna", reps: 12, sets: 4 },
            { name: "Curl de pierna", reps: 12, sets: 4 }
        ],
        day3: [
            { name: "Dominadas", reps: 10, sets: 4 },
            { name: "Remo con barra", reps: 10, sets: 4 },
            { name: "Jalones al pecho", reps: 10, sets: 4 },
            { name: "Peso muerto", reps: 10, sets: 4 }
        ],
        day4: [
            { name: "Curl de bíceps con barra", reps: 12, sets: 4 },
            { name: "Curl de martillo", reps: 12, sets: 4 },
            { name: "Press francés", reps: 12, sets: 4 },
            { name: "Press militar con barra", reps: 10, sets: 4 },
            { name: "Elevaciones laterales", reps: 15, sets: 4 }
        ],
        day5: [
            { name: "Crunches con peso", reps: 20, sets: 4 },
            { name: "Elevaciones de piernas en banco", reps: 15, sets: 4 },
            { name: "Plancha", reps: 45, sets: 4 },
            { name: "Cardio", time: 30, type: "minutes" }
        ]
    },
    advanced: {
        day1: [
            { name: "Press de banca con barra", reps: 8, sets: 5 },
            { name: "Press inclinado con barra", reps: 8, sets: 5 },
            { name: "Aperturas con mancuernas", reps: 10, sets: 5 },
            { name: "Fondos en paralelas con peso", reps: 10, sets: 4 },
            { name: "Press declinado con barra", reps: 10, sets: 4 }
        ],
        day2: [
            { name: "Sentadillas", reps: 10, sets: 5 },
            { name: "Prensa de pierna", reps: 10, sets: 5 },
            { name: "Extensiones de pierna", reps: 10, sets: 5 },
            { name: "Curl de pierna", reps: 10, sets: 5 },
            { name: "Peso muerto rumano", reps: 12, sets: 4 }
        ],
        day3: [
            { name: "Dominadas con peso", reps: 8, sets: 5 },
            { name: "Remo con barra", reps: 8, sets: 5 },
            { name: "Jalones al pecho con agarre cerrado", reps: 10, sets: 5 },
            { name: "Peso muerto", reps: 8, sets: 5 },
            { name: "Remo en máquina", reps: 10, sets: 4 }
        ],
        day4: [
            { name: "Curl de bíceps con barra", reps: 10, sets: 5 },
            { name: "Curl de martillo con mancuernas", reps: 10, sets: 5 },
            { name: "Curl concentrado", reps: 12, sets: 4 },
            { name: "Press francés con barra", reps: 10, sets: 5 },
            { name: "Extensiones de tríceps en polea con cuerda", reps: 10, sets: 5 },
            { name: "Press militar con barra", reps: 8, sets: 5 },
            { name: "Elevaciones laterales con mancuernas", reps: 15, sets: 5 }
        ],
        day5: [
            { name: "Crunches con peso", reps: 20, sets: 5 },
            { name: "Elevaciones de piernas colgado", reps: 15, sets: 5 },
            { name: "Plancha con peso", reps: 60, sets: 5 },
            { name: "Cardio (HIIT en cinta, bicicleta o elíptica)", time: 30, type: "minutes" }
        ]
    }
};

let currentRoutine = [];
let currentDay = '';
let currentExercise = 0;
let exerciseInterval;
let isPaused = false;
let timerInterval;
let elapsedTime = 0;
let previousScreen = '';

const exerciseImages = {
    "Curl concentrado": "Curl concentrado.jpeg",
    "Curl de bíceps con barra": "Curl de bíceps con barra.jpeg",
    "Curl de bíceps con mancuernas": "Curl de bíceps con mancuernas.jpeg",
    "Curl de martillo": "Curl de martillo.jpeg",
    "Aperturas con mancuernas": "Aperturas con mancuernas.jpeg",
    "Cardio (HIIT en cinta, bicicleta o elíptica)": "Cardio (HIIT en cinta, bicicleta o elíptica.jpeg)",
    "Cardio": "Cardio.jpeg",
    "Crunches con peso": "Crunches con peso.jpeg",
    "Crunches": "Crunches.jpeg",
    "Elevaciones de piernas": "Elevaciones de piernas.jpeg",
    "Elevaciones laterales": "Elevaciones laterales.jpeg",
    "Extensiones de pierna": "Extensiones de pierna.jpeg",
    "Extensiones de tríceps en polea con cuerda": "Extensiones de tríceps en polea con cuerda.jpeg",
    "Extensiones de tríceps en polea": "Extensiones de tríceps en polea.jpeg",
    "Curl de pierna": "Curl de pierna.jpeg",
    "Dominadas con peso": "Dominadas con peso.jpeg",
    "Dominadas": "Dominadas.jpeg",
    "Elevaciones de piernas en banco": "Elevaciones de piernas en banco.jpeg",
    "Plancha": "Plancha.jpeg",
    "Prensa de pierna": "Prensa de pierna.jpeg",
    "Fondos en paralelas": "Fondos en paralelas.jpeg",
    "Jalones al pecho con agarre cerrado": "Jalones al pecho con agarre cerrado.jpeg",
    "Jalones al pecho": "Jalones al pecho.jpeg",
    "Peso muerto con piernas rígidas": "Peso muerto con piernas rígidas.jpeg",
    "Peso muerto rumano": "Peso muerto rumano.jpeg",
    "Peso muerto": "Peso muerto.jpeg",
    "Plancha con peso": "Plancha con peso.jpeg",
    "Press inclinado con barra": "Press inclinado con barra.jpeg",
    "Press inclinado con mancuernas": "Press inclinado con mancuernas.jpeg",
    "Press militar con mancuernas": "Press militar con mancuernas.jpeg",
    "Remo con barra": "Remo con barra.jpeg",
    "Remo con mancuerna": "Remo con mancuerna.jpeg",
    "Press de banca con barra": "Press de banca con barra.jpeg",
    "Press de banca con mancuernas": "Press de banca con mancuernas.jpeg",
    "Press declinado con barra": "Press declinado con barra.jpeg",
    "Press francés": "Press francés.jpeg",
    "Remo en máquina": "Remo en máquina.jpeg",
    "Sentadillas": "Sentadillas.jpeg"
};

function goBack() {
    const confirmation = confirm("¿Quieres salir de la rutina?");
    if (confirmation) {
        regresar();
    }
}

function selectLevel(level) {
    currentRoutine = routines[level];
    const mainContainer = document.getElementById('main-container');
    previousScreen = mainContainer.innerHTML;
    mainContainer.innerHTML = '<h1>Rutinas de Gimnasio</h1><div class="routine-selection" id="routine-selection"></div>';
    const routineSelection = document.getElementById('routine-selection');
    routineSelection.innerHTML = '<button class="back-btn" onclick="regresar()">←</button>';
    for (let day in currentRoutine) {
        routineSelection.innerHTML += `<button class="day-btn" onclick="selectDay('${day}')">${day.charAt(0).toUpperCase() + day.slice(1)}</button>`;
    }
}

function selectDay(day) {
    currentDay = day;
    const mainContainer = document.getElementById('main-container');
    previousScreen = mainContainer.innerHTML;
    let exercisesList = '';
    currentRoutine[day].forEach(exercise => {
        exercisesList += `<li>${exercise.name} - ${exercise.reps ? `${exercise.reps} reps x ${exercise.sets} sets` : `${exercise.time} minutos de ${exercise.type}`}</li>`;
    });
    mainContainer.innerHTML = `
        <button class="back-btn" onclick="goBack()">←</button>
        <h2>Rutina para ${day.charAt(0).toUpperCase() + day.slice(1)}</h2>
        <ul>${exercisesList}</ul>
        <button class="control-btn" onclick="startRoutine()">Iniciar Rutina</button>
    `;
}

function startRoutine() {
    currentExercise = 0;
    isPaused = false;
    elapsedTime = 0;
    startExercise();
}

function startExercise() {
    const exercise = currentRoutine[currentDay][currentExercise];
    const mainContainer = document.getElementById('main-container');
    const exerciseImage = exerciseImages[exercise.name];
    mainContainer.innerHTML = `
        <button class="back-btn" onclick="goBack()">←</button>
        <h2>${exercise.name}</h2>
        ${exerciseImage ? `<img src="Imagenes de ejercicios gym/${exerciseImage}.jpeg" alt="${exercise.name}" class="exercise-image">` : ''}
        <div class="timer" id="timer">0:00</div>
        <div class="button-group">
            <button class="control-btn" onclick="pauseExercise()">Pausa</button>
            <button class="control-btn" onclick="finishExercise()">Finalizar</button>
        </div>
    `;
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            elapsedTime++;
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function pauseExercise() {
    isPaused = !isPaused;
    document.querySelector('.control-btn[onclick="pauseExercise()"]').innerText = isPaused ? 'Continuar' : 'Pausa';
}

function finishExercise() {
    clearInterval(timerInterval);
    const mainContainer = document.getElementById('main-container');
    if (currentExercise < currentRoutine[currentDay].length - 1) {
        currentExercise++;
        mainContainer.innerHTML = `
            <button class="back-btn" onclick="goBack()">←</button>
            <h2>Próximo Ejercicio: ${currentRoutine[currentDay][currentExercise].name}</h2>
            <button class="control-btn" onclick="startExercise()">Iniciar Ejercicio</button>
        `;
    } else {
        mainContainer.innerHTML = `
            <button class="back-btn" onclick="goBack()">←</button>
            <h2>¡Bien hecho!</h2>
            <p>Has completado todos los ejercicios del día.</p>
            <button class="control-btn" onclick="selectLevel('beginner')">Finalizar</button>
        `;
    }
}

function regresar() {
    const lastScreen = popHistory();
    if (lastScreen) {
        ocultarTodo();
        document.getElementById(lastScreen).style.display = "block";
    } else {
        mostrarActividades();
    }
}
