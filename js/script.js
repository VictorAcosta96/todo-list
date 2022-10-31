document.addEventListener('DOMContentLoaded',()=>{

    if (localStorage.getItem(KEY_LOCALSTORAGE)) {
        arrayTodo = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE));
    }
    showTodo();
})


const KEY_LOCALSTORAGE = "listTodo";
let arrayTodo = [];



const form =  document.getElementById('form');
const listContainer = document.getElementById('list-container');
const fragment = document.createDocumentFragment();



const addTodo = (e) =>{
    e.preventDefault();
    
    let todo = e.target.todo.value;
    
    if (todo === "") {
        // alert('no puedes agregar una tarea vacia');
        return
    }else{
        
        
        const item = {
            description: todo,
            finished: false
        }
        
        arrayTodo.push(item)
        
        addTodoLocalStorage();
        showTodo();
        
        // console.log(arrayTodo)
        form.reset();
    }
}

const getArregloTdos = ()=>{
    
    const arrayList = JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE));
    if (arrayList) {
        return arrayList;
    }else{
        return [];
    }
    
}

const addTodoLocalStorage = ()=>{
    localStorage.setItem(KEY_LOCALSTORAGE,JSON.stringify(arrayTodo));
}




const showTodo = ()=>{
    listContainer.textContent = ""
    let todos = getArregloTdos();
    for(const [index,todo] of todos.entries()){
        const linkToRemove = document.createElement('a');
        linkToRemove.classList.add('link_remove');
        linkToRemove.textContent = "x";
        linkToRemove.href= "#";
        linkToRemove.addEventListener('click',(e)=>{
            e.preventDefault();
            if (!confirm("¿Eliminar Tarea?")) {
                return;
            }

            (span.classList.contains('underline')) ? alert('no se puede eliminar la tarea') : arrayTodo.splice(index,1);

            addTodoLocalStorage(arrayTodo);
            showTodo();
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener('click', function () { // no se trabaja con una función flecha porque se necesita acceder al elemento a través de this
            if (this.checked) {
                arrayTodo[index].finished = true;
            } else {
                arrayTodo[index].finished = false;
            }
            addTodoLocalStorage(todos);
            showTodo();
          });
           // El span que llevará el contenido de la tarea
    const span = document.createElement("span");
    span.textContent = todo.description;
    // Y finalmente el elemento de la lista
    // Verificamos si la tarea está marcada para marcar los elementos
   
    if (todo.finished) {
      checkbox.checked = true;
      span.classList.add("underline");
    }

        //creamos un elemento de la lista
        const itemList = document.createElement('LI');
        //le asignamos el valor de la variable que estamos recorriendo en el for
        // itemList.textContent = todo.description;
        //luego agregamos los valores del arreglo al fragment
        itemList.appendChild(checkbox);
        itemList.appendChild(span)
        itemList.appendChild(linkToRemove);
        fragment.appendChild(itemList);
    }
    listContainer.appendChild(fragment)
}

    
form.addEventListener('submit', addTodo);




