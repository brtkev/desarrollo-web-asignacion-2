/** 2.1 setupCounter accede al DOM a travez de JS */
export function setupCounter(element: HTMLButtonElement, container : HTMLElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  /** 2.3 agregamos un nuevo event listener para ordenar los libros */
  element.addEventListener('click', () => sortBooks(container, counter));
  setCounter(0)
}

/**
 * 2.3 Cambie el funcionamiento del botón Counter para que al presionarlo
ordene los libros de manera alfabética por Titulo. Si lo presiona de
nuevo, que lo ordene en orden descendente por Titulo.
 * 
  creo la funcion afuera para no interferir tanto con la funcion original
 */

  /** la funcion, se ejecuta guardando una lista de las cards y limpiando el contenedor original
   * luego se sortea la lista de cards por titulo, ascendente o decendente
   * y luego se rellena nuevamente el contenedor
   */
function sortBooks(container : HTMLElement, counter: number){
  /** si le contador es par entonces, decendiente, si es impar ascendente */
  const sortingDirection = counter % 2 === 0;

  /** obtiene los book-card s, y duplica el objeto para que no se pierdan al borrarlos del elemento */
  const bookCards = Array.from(container.children);
  
  /** borra los hijos del elemento */
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (container.lastElementChild) {
    container.removeChild(container.lastElementChild);
  }

  /** ordenamos las tarjetas */
  const sortedBookCards = bookCards.sort( (bookA, bookB ) => {

    /** obtenemos los titulos */
    const titleA = bookA.getElementsByClassName("card-title")[0].textContent || ""; /** agrego "" para  */
    const titleB = bookB.getElementsByClassName("card-title")[0].textContent || ""; /** evitar el error de TypeScript */
    //https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript

    // sorteamos decendente o ascendente
    if(!sortingDirection){
      return titleA.localeCompare(titleB);
    }else {
      return titleB.localeCompare(titleA);
    }
  })

  /** agregamos de nuevo los libros a la lista */
  sortedBookCards.forEach( bookCard => {
    container.appendChild(bookCard)
  })
  


}