const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const app = new Vue({
    el:'#app',
    data:{
        catalogUrl : `/catalogData.json`,
        products:[],
        producInBasket:[],
        imgCatalog:'https://via.placeholder.com/200x150',
        basketCondition:'false',
        basketItems:'true',
        search:'',
    },
    methods:{
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error =>{
                    console.log(error)
                })

        },
        addProduct(product){
            var clicked = product.id_product; //получаем id  элемента по которому произведен клик
            var ids = this.products.map(el=> el.id_product); // получает индекс кликнутого элемента в основном массиве товаров
            var clickedProductIndex = ids.indexOf(clicked); // получаем сам кликнутый элемент из массива товаров
            var productElement =this.products[clickedProductIndex] ;
            var idInBasket = this.producInBasket.map(el=> el.id_product); // осставляем массив с id товаров для проверки на наличие товаров в корзине
            if(idInBasket.includes(clicked)){
                productElement.count++
            }else{
                productElement.count=1
                this.producInBasket.push(productElement);   // добавляем кликнутый элемент в  массив корзины 
            }
        },
        removeProduct(item){
            var clicked = item.id_product;  //получаем id  элемента по которому произведен клик
            var ids = this.producInBasket.map(el =>el.id_product); 
            var clickedProductIndex = ids.indexOf(clicked); // получает индекс кликнутого элемента в массиве корзины
            var productElement =this.producInBasket[clickedProductIndex] 
            if(productElement.count == 1){
                this.producInBasket.splice(clickedProductIndex)
            }else(
                productElement.count--
            )
        },
    },
    computed:{
        basketBasketLength(){
            if(this.producInBasket.length >0){
               return true
            }else{
                return false
            }
        },
        filteredProducts(){
            return this.products.filter((product) =>{
                return product.product_name.indexOf(this.search) >-1
                })
        }
    },
    created(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data =>{
                for(let el of data){
                    this.products.push(el)
                }
            })
    }
})