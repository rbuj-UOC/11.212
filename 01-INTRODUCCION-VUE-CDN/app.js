// Paso 5.1: Definimos un json con datos de ejemplo
const gradesData = [
    { id: 1, name: "Alice Johnson", grade: 8.5 },
    { id: 2, name: "Bob Smith", grade: 7.2 },
    { id: 3, name: "Charlie Brown", grade: 9.0 },
    { id: 4, name: "Diana Prince", grade: 4.8 },
    { id: 5, name: "Ethan Hunt", grade: 5.9 },
    { id: 6, name: "Fiona Gallagher", grade: 8.1 },
    { id: 7, name: "George Miller", grade: 2.7 },
    { id: 8, name: "Hannah Lee", grade: 9.3 },
    { id: 9, name: "Ian Wright", grade: 3.4 },
    { id: 10, name: "Julia Roberts", grade: 7.9 },
];

console.log('Hello world!');
console.log("Hello world from script");

// Paso 2
// console.log del objeto Vue
console.log("Vue object --> ", Vue);


// Paso 2.3
// Creamos la aplicación Vue
// Paso 3.3
// Añadimos ref para poder definir variables reactivas
const { createApp, ref } = Vue;
const app = createApp({
    template: `
        <h1>Hello world from Vue App!</h1>
        <h2>{{name}}</h2>
        <button @click="updateName">Change name</button>

        <button @click="showGrades">Toggle visibility Grades</button>

        <ul v-if="isVisibleGrades">
            <li v-for="student in gradesData" :key="student.id">
                {{ student.name }}: {{ student.grade }}
            </li>
        </ul>

        <hr>

        <ul v-show="isVisibleGrades">
            <li v-for="student in gradesData" :key="student.id">
                {{ student.name }}: {{ student.grade }}
            </li>
        </ul>
    `,
    // Paso 3.1
    // Añadimos la función setup, definido la variable name y la retornamos
    // para que sea accesible desde el template
    setup() {
        let name = ref("Robert");

        /*
        // Paso 3.2
        // Modificamos el valor de name después de 2 segundos
        setTimeout(() => {
            name.value = "Antoni";
            console.log("Change value Robert to Antoni");
        }, 2000);
        */

        // Paso 4
        // creamos la función updateName para cambiar el valor de name
        const updateName = () => {
            name.value = "Antoni";
            console.log("Change value Robert to Antoni");
        }

        // Paso 6.1: variable para mostrar u ocultar elemento
        const isVisibleGrades = ref(true);

        // Paso 6.2: Método que modifica el valor de isVisibleGrades
        const showGrades = () => {
            isVisibleGrades.value = !isVisibleGrades.value;
        };

        return {
            name,
            // Paso 4: Exponemos la nueva función para que esté disponible en el
            // template
            updateName,
            // Paso 5.2: Exponemos el json de datos para que esté disponible en
            // el template
            gradesData,
            // Paso 6.3: Exponemos la variable y el método para que estén
            // disponibles en el template
            isVisibleGrades,
            showGrades,
        }
    }
});
app.mount('#vueApp');