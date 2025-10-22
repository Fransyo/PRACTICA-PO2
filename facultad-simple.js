const readline = require('readline-sync');
// Clase base Persona
class Persona {
    constructor(nombres, apellidos, identificacion, estadoCivil) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.identificacion = identificacion;
        this.estadoCivil = estadoCivil;
    }
    cambiarEstadoCivil(nuevoEstado) {
        this.estadoCivil = nuevoEstado;
        console.log(`Estado civil cambiado a: ${nuevoEstado}`);
    }
    mostrarInfo() {
        console.log(`Nombre: ${this.nombres} ${this.apellidos}`);
        console.log(`ID: ${this.identificacion}`);
        console.log(`Estado Civil: ${this.estadoCivil}`);
    }
}
class Estudiante extends Persona {
    constructor(nombres, apellidos, identificacion, estadoCivil, curso) {
        super(nombres, apellidos, identificacion, estadoCivil);
        this.curso = curso;
    }
    cambiarCurso(nuevoCurso) {
        this.curso = nuevoCurso;
        console.log(`Curso cambiado a: ${nuevoCurso}`);
    }
    mostrarInfo() {
        super.mostrarInfo();
        console.log(`Curso: ${this.curso}`);
        console.log('------------------------');
    }
}
class Profesor extends Persona {
    constructor(nombres, apellidos, identificacion, estadoCivil, añoIncorporacion, despacho, departamento) {
        super(nombres, apellidos, identificacion, estadoCivil);
        this.añoIncorporacion = añoIncorporacion;
        this.despacho = despacho;
        this.departamento = departamento;
    }
    cambiarDepartamento(nuevoDepto) {
        this.departamento = nuevoDepto;
        console.log(`Departamento cambiado a: ${nuevoDepto}`);
    }
    cambiarDespacho(nuevoDespacho) {
        this.despacho = nuevoDespacho;
        console.log(`Despacho cambiado a: ${nuevoDespacho}`);
    }
    mostrarInfo() {
        super.mostrarInfo();
        console.log(`Año Incorporación: ${this.añoIncorporacion}`);
        console.log(`Despacho: ${this.despacho}`);
        console.log(`Departamento: ${this.departamento}`);
        console.log('------------------------');
    }
}
class PersonalServicio extends Persona {
    constructor(nombres, apellidos, identificacion, estadoCivil, añoIncorporacion, despacho, seccion) {
        super(nombres, apellidos, identificacion, estadoCivil);
        this.añoIncorporacion = añoIncorporacion;
        this.despacho = despacho;
        this.seccion = seccion;
    }
    cambiarSeccion(nuevaSeccion) {
        this.seccion = nuevaSeccion;
        console.log(`Sección cambiada a: ${nuevaSeccion}`);
    }
    cambiarDespacho(nuevoDespacho) {
        this.despacho = nuevoDespacho;
        console.log(`Despacho cambiado a: ${nuevoDespacho}`);
    }
    mostrarInfo() {
        super.mostrarInfo();
        console.log(`Año Incorporación: ${this.añoIncorporacion}`);
        console.log(`Despacho: ${this.despacho}`);
        console.log(`Sección: ${this.seccion}`);
        console.log('------------------------');
    }
}
// Sistema principal
class SistemaFacultad {
    constructor() {
        this.personas = [];
    }
    iniciar() {
        console.log("=== SISTEMA FACULTAD ===");
        while (true) {
            console.log("\n1. Crear persona");
            console.log("2. Ver personas");
            console.log("3. Editar persona");
            console.log("4. Salir");
            const opcion = readline.question("Elige una opción: ");
            if (opcion === "1") {
                this.crearPersona();
            }
            else if (opcion === "2") {
                this.verPersonas();
            }
            else if (opcion === "3") {
                this.editarPersona();
            }
            else if (opcion === "4") {
                console.log("¡Adiós!");
                break;
            }
            else {
                console.log("Opción no válida");
            }
        }
    }
    crearPersona() {
        console.log("\n--- CREAR PERSONA ---");
        console.log("1. Estudiante");
        console.log("2. Profesor");
        console.log("3. Personal de servicio");
        const tipo = readline.question("Tipo: ");
        const nombres = readline.question("Nombres: ");
        const apellidos = readline.question("Apellidos: ");
        const id = readline.question("ID: ");
        const estadoCivil = readline.question("Estado civil: ");
        if (tipo === "1") {
            const curso = readline.question("Curso: ");
            const estudiante = new Estudiante(nombres, apellidos, id, estadoCivil, curso);
            this.personas.push(estudiante);
            console.log("✅ Estudiante creado");
        }
        else if (tipo === "2") {
            const año = parseInt(readline.question("Año incorporación: "));
            const despacho = readline.question("Despacho: ");
            const depto = readline.question("Departamento: ");
            const profesor = new Profesor(nombres, apellidos, id, estadoCivil, año, despacho, depto);
            this.personas.push(profesor);
            console.log("✅ Profesor creado");
        }
        else if (tipo === "3") {
            const año = parseInt(readline.question("Año incorporación: "));
            const despacho = readline.question("Despacho: ");
            const seccion = readline.question("Sección: ");
            const personal = new PersonalServicio(nombres, apellidos, id, estadoCivil, año, despacho, seccion);
            this.personas.push(personal);
            console.log("✅ Personal creado");
        }
        else {
            console.log("Tipo no válido");
        }
    }
    verPersonas() {
        console.log("\n--- LISTA DE PERSONAS ---");
        if (this.personas.length === 0) {
            console.log("No hay personas registradas");
            return;
        }
        this.personas.forEach((persona, index) => {
            console.log(`\n[${index + 1}] ${persona.constructor.name}:`);
            persona.mostrarInfo();
        });
    }
    editarPersona() {
        if (this.personas.length === 0) {
            console.log("No hay personas para editar");
            return;
        }
        console.log("\n--- EDITAR PERSONA ---");
        // Mostrar lista simple
        this.personas.forEach((persona, index) => {
            let tipo = "";
            if (persona instanceof Estudiante)
                tipo = "Estudiante";
            else if (persona instanceof Profesor)
                tipo = "Profesor";
            else if (persona instanceof PersonalServicio)
                tipo = "Personal";
            console.log(`[${index + 1}] ${persona.nombres} ${persona.apellidos} (${tipo})`);
        });
        const numStr = readline.question("Número de persona a editar: ");
        const num = parseInt(numStr) - 1;
        if (isNaN(num) || num < 0 || num >= this.personas.length) {
            console.log("Número inválido");
            return;
        }
        const persona = this.personas[num];
        console.log(`\nEditando a: ${persona.nombres} ${persona.apellidos}`);
        console.log("1. Cambiar estado civil");
        if (persona instanceof Estudiante) {
            console.log("2. Cambiar curso");
            const opcion = readline.question("Qué quieres cambiar: ");
            if (opcion === "1") {
                const nuevoEstado = readline.question("Nuevo estado civil: ");
                persona.cambiarEstadoCivil(nuevoEstado);
            }
            else if (opcion === "2") {
                const nuevoCurso = readline.question("Nuevo curso: ");
                persona.cambiarCurso(nuevoCurso);
            }
            else {
                console.log("Opción no válida");
            }
        }
        else if (persona instanceof Profesor) {
            console.log("2. Cambiar departamento");
            console.log("3. Cambiar despacho");
            const opcion = readline.question("Qué quieres cambiar: ");
            if (opcion === "1") {
                const nuevoEstado = readline.question("Nuevo estado civil: ");
                persona.cambiarEstadoCivil(nuevoEstado);
            }
            else if (opcion === "2") {
                const nuevoDepto = readline.question("Nuevo departamento: ");
                persona.cambiarDepartamento(nuevoDepto);
            }
            else if (opcion === "3") {
                const nuevoDespacho = readline.question("Nuevo despacho: ");
                persona.cambiarDespacho(nuevoDespacho);
            }
            else {
                console.log("Opción no válida");
            }
        }
        else if (persona instanceof PersonalServicio) {
            console.log("2. Cambiar sección");
            console.log("3. Cambiar despacho");
            const opcion = readline.question("Qué quieres cambiar: ");
            if (opcion === "1") {
                const nuevoEstado = readline.question("Nuevo estado civil: ");
                persona.cambiarEstadoCivil(nuevoEstado);
            }
            else if (opcion === "2") {
                const nuevaSeccion = readline.question("Nueva sección: ");
                persona.cambiarSeccion(nuevaSeccion);
            }
            else if (opcion === "3") {
                const nuevoDespacho = readline.question("Nuevo despacho: ");
                persona.cambiarDespacho(nuevoDespacho);
            }
            else {
                console.log("Opción no válida");
            }
        }
    }
}
// Iniciar el sistema
console.log("Iniciando sistema...");
const sistema = new SistemaFacultad();
sistema.iniciar();
