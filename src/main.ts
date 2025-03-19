/**
 * 2.1 identifique en que partes del código se está haciendo uso de JavaScript
  para acceder al DOM y qué hace cada instrucción que lo accede.
 */


import './style.css'
import { setupCounter } from './counter.ts'
import fantasyBooks from '../json/fantasy-books.json'

/** 2.1 createBookCard accede al DOM a travez de JS, 
 * crea elementos HTML, agrega clases a los elementos, 
 * modifica textos y agrega hijos a elementos*/
// Function to create a card for each book
function createBookCard(book : any) { /** agrege : any para que deje de dar error TS */

  /**
   * 2.2 Agregue a cada tarjeta la foto del libro si posee foto. La foto debe estar a
    la izquierda del nombre y autor del libro.
   */
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  /**
   * creamos un div extra donde se mantendran el titulo y los autores
   * ademas creamos la clase card-properties para darle estilos
   */
  const cardBodyProperties = document.createElement('div');
  cardBodyProperties.classList.add('card-properties');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.classList.add('card-text');
  author.textContent = `Author: ${book.authors[0].name}`;

  /**
   * creamos un elemento imagen, en null por si el libro no trae imagen
   */
  let imagen = null;
  if(book.formats){
    imagen = document.createElement('img');

    /**
     * le agregamos la clase card-image para estilarlo y le damos los necesarios src y alt
     */
    imagen.classList.add('card-image');
    imagen.src = book.formats['image/jpeg'];
    imagen.alt = book.title +  " book cover";
  }

  // Add other book properties as needed (e.g., subjects, formats, etc.)

  /**
   * agregamos la imagen si existe, de primero
   */
  if(imagen) cardBody.appendChild(imagen);
  /**
   * luego agregamos el titulo y el autor al div de propiedades
   */
  cardBodyProperties.appendChild(title);
  cardBodyProperties.appendChild(author);
  /** y por ultimo agregamos el div de propiedades al body */
  cardBody.appendChild(cardBodyProperties);
  cardDiv.appendChild(cardBody);

  return cardDiv;
}

/**
 * 2.1 bookContainer es accedido a travez del dom
 */
// Get the container where cards will be added
const container = document.getElementById('bookContainer');
if(container){ /** agrege validacion de existencia para que TS deje de dar error */

  // Loop through the books and create cards dynamically
  fantasyBooks.results.forEach((book) => {
    const bookCard = createBookCard(book);
    container.appendChild(bookCard);
  });
  
  /** 2.1 setupCounter accede al DOM a travez de JS */
  /** 2.3 adaptamos setupCounter para que reciba el contenedor de las cards y asi poder filtrarlas */
  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!, container);
}

