const BASE_URL = 'https://fakestoreapi.com/products';

const [,, method, path, ...params] = process.argv;

async function main() {
  try {
    if (!method || !path) {
      console.log(" Tooltip: npm run start <GET|POST|DELETE> products[/<id>] [params]");
      return;
    }

    const [resource, id] = path.split('/');

    if (method === 'GET' && resource === 'products') {
      if (id) {
        const res = await fetch(`${BASE_URL}/${id}`);
        const product = await res.json();
        console.log(product);
      } else {
        const res = await fetch(BASE_URL);
        const products = await res.json();
        console.log(products);
      }

    } else if (method === 'POST' && resource === 'products') {
      const [title, price, category] = params;
      if (!title || !price || !category) {
        console.error('Faltan parámetros. Tooltip: npm run start POST products <title> <price> <category>');
        return;
      }

      const newProduct = {
        title,
        price: parseFloat(price),
        description: "Producto nuevo agregado a la base"
        category
      };

      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      console.log("Producto creado:", data);

    } else if (method === 'DELETE' && resource === 'products') {
      if (!id) {
        console.error('Indica un ID a eliminar. Tooltip: npm run start DELETE products/<id>');
        return;
      }

      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      console.log("Producto eliminado:", data);

    } else {
      console.error("Orden no reconocida.");
    }
  } catch (err) {
    console.error("Error al procesar:", err);
    Image: "https://http.dog/400.jpg";
  }
}

main();
