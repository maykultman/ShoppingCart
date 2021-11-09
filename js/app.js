var currency = 'MXN'; // predeterminado
window.onload = function() {
	let listProducts = document.getElementById('listProducts');
	let checkoutList = document.getElementById('checkoutList');
	// cart_items es el id de la lista del carrito que esta en el header
	cart_items.addEventListener('click',({ target })=>{
		carrito.addItem(target.dataset.id, target.dataset.simbol);
		if( checkoutList ){
			compiled_tmp('template', 'checkoutList', carrito.items );
		}
	});

	if( listProducts != undefined ){
		/* prepara el template para la lista de productos y los imprime */
		compiled_tmp('template', 'listProducts', products);
		// Delegamos los clicks al contenedor de la lista de productos
		listProducts.addEventListener('click',({ target })=>{
			if(target.dataset.id){
				carrito.addItem(target.dataset.id, 'add');
			}
		})
	}
	if( checkoutList != undefined ){
		compiled_tmp('template', 'checkoutList', carrito.items );
		checkoutList.addEventListener('click',({ target })=>{
			if(target.dataset.id){
				carrito.addItem(target.dataset.id, target.dataset.simbol);
				compiled_tmp('template', 'checkoutList', carrito.items );
			}
		});
	}
}