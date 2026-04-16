console.log('Hello world!');
console.log("Hello world from script");

// Paso 2
// console.log del objeto Vue
console.log("Vue object --> ", Vue);


// Paso 2.3
// Creamos la aplicación Vue
const { createApp } = Vue;
const app = createApp({
    template: `
        <h1>Hello world from Vue App!</h1>
        <h2>{{name}}</h2>
    `,
    // Paso 3.1
    // Añadimos la función setup, definido la variable name y la retornamos
    // para que sea accesible desde el template
    setup() {
        let name = "Robert";
        // Paso 3.2
        // Modificamos el valor de name después de 2 segundos
        setTimeout(() => {
            name = "Antoni";
            console.log("Change value Robert to Antoni");
        }, 2000);
        return {
            name
        }
    }
});
app.mount('#vueApp');