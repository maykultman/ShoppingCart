class Carrito{
    constructor(array, currency) {
        this.items = array;
    }
    init(){
        if( Cookies.getJSON('items') == undefined ){
            Cookies.set('items', [], { expires: 15 });
        }
        this.items = Cookies.getJSON('items');
        this.render();
    }
    getData( product_id ){
        return products.find(p=>p.id==product_id);
    }
    save(){
        Cookies.set('items',this.items);
        this.render('save');
    }
    updateQtyItem(e,a){
        this.items.find(p=>{
            if(p.id == e){
                if(a==0){
                    this.deleteItem(e);
                }else {
                    p.qty = a;
                }
            }
            this.save();
        });
    }
    empty(){
        Cookies.set('items',[]);
    }
    totalItems(){
        return this.items.length;
    }
    deleteItem(product_id){
        const items = this.items;
        this.items = items.filter(p=>p.id != product_id);
        this.save();
    }
    updateItem(e,a){
        let qty = 0;
        this.items.find(p=>{
            if(p.id == e){
                qty = ( a == 'add' ? p.qty+1 : p.qty-1 );
                if(qty==0){
                    this.deleteItem(e);
                }else {
                    p.qty = qty;
                }
                qty==0;
            }
            this.save();
        });
    }
    total(){
        let total = 0;
        this.items.forEach(p=>{
            total = total + ( Number(p.price) * p.qty );
        });
        const string = format(total, 2);
        return { number : total, string };
    }
    getItem(product_id){
        return this.items.find(p=>p.id==product_id);
    }
    addItem(product_id, operacion){
        let product = this.getData(product_id);
        if( this.getItem(product.id) == undefined ){
            product.qty = 1;
            product.str_price = format(product.price, 2);
            this.items.push(product);
            this.save();
        } else {
            this.updateItem(product.id,operacion);
        }
    }
    render(){
        // totalItems es una etiqueta span que esta junto al botón ver carrito
        totalItems.innerHTML = carrito.totalItems();
        const total = carrito.total();
        totalCar.innerHTML = total.string;
        if( document.getElementById('totalCheckout') ){
            totalCheckout.innerHTML = total.string;
        }

        let template = 'tmp_carEmpty';
        if( this.totalItems() > 0 ){
            // template para los items
            compiled_tmp('tmp_item', 'cart_items', this.items);
        }else{
            // template para mensaje de carrito vacio
            compiled_tmp('tmp_carEmpty', 'cart_items');
        }

    }
}
carrito = new Carrito([]);
carrito.init();

