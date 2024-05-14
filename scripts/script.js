//fetchImages();

function fetchImages() {
    fetch('images/')
        .then(response => response.text())
        .then(data => {
            const gallery = document.getElementById('gallery');
            // Convertir la respuesta en texto a un documento HTML
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');
            // Obtener todas las etiquetas "a" que representan las imágenes
            const imageLinks = htmlDocument.querySelectorAll('a');
            // Iterar sobre las etiquetas "a" para crear elementos "img" y agregarlos al DOM
            imageLinks.forEach(link => {
                if (link.getAttribute('href') != '?C=N;O=D' &&
                    link.getAttribute('href') != '?C=M;O=A' &&
                    link.getAttribute('href') != '?C=S;O=A' &&
                    link.getAttribute('href') != '?C=D;O=A' &&
                    link.getAttribute('href') != '/') {
                    console.log(link);
                    const img = document.createElement('img');
                    img.className = 'img-fluid';
                    img.src = 'images/' + link.getAttribute('href');
                    gallery.appendChild(img);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de imágenes:', error);
        });
}

loadImages();

function loadImages() {
    const gallery = document.getElementById('gallery');
    const texto = '';
    var prices;

    fetch("prices/prices.txt")
        .then((res) => res.text())
        .then((text) => {
            prices = text.split('\n');
            console.log(prices[1]);

            for (var i = 1; i < 85; i++) {
                const container = document.createElement('div');
                container.id = 'image';
                container.className = 'rounded-5 bg-white bg-opacity-50';
                gallery.appendChild(container);

                const subcontainer = document.createElement('div');
                subcontainer.className = 'd-flex justify-content-center align-items-center';
                container.appendChild(subcontainer);

                const img = document.createElement('img');
                img.className = 'img-fluid rounded-3 mt-4';
                img.src = 'images/' + i + ((i == 62 || i == 65) ? '.png' : '.jpg');
                subcontainer.appendChild(img);

                const div = document.createElement('div');
                div.className = 'price fw-bold fs-4 d-flex justify-content-center align-items-center border border-info rounded-5 bg-white bg-opacity-50';
                div.textContent = 'Precio: ' + prices[i - 1] + '€';
                container.appendChild(div);

                const margin = document.createElement('a');
                margin.className = 'mb-4';
                container.appendChild(margin);
            }
        })
        .catch((e) => console.error(e));


}