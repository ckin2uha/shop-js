        //ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

        let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard', 'HDD', 'GPU' ,'SSD']
        let PRICES = [100, 120, 1000, 15, 18, 20, 345, 123]
        let IDS = [0, 1, 2, 3, 4, 5, 6, 7]

        //let products = [] //массив объектов
        
        let catalog = {
            items: [],
            container: '.container',
            construct () {
                this._init () //_ - это обозначение инкапсулированного метода
            },
            _init () {
                this._handleData ()
                this.render ()
                cart.construct()
            },
            _handleData () {
                for (let i = 0; i < IDS.length; i++) {
                    this.items.push (this._createNewProduct (i))
                }
            },
            _createNewProduct (index) {
                return {
                    product_name: PRODUCTS_NAMES [index],
                    price: PRICES [index],
                    product_id: IDS [index]
                }
            },
            render () {
                let str = ''
                this.items.forEach (item => {
                    str += `
                        <div class="product">
                            <img src="https://placehold.it/300x200">
                            <span>${item.product_name}</span>
                            <i>${item.price} $</i>
                            <button id="${item.product_id}" onclick="cart.addProduct(${item.product_id})">Купить</button>
                        </div>
                    `
                })
                document.querySelector(this.container).innerHTML = str
            }
        }

        let cart = {
            items: [],
            total: 0,
            sum: 0,
            construct() {
                    this._checkTotal()
                    this._renderQuantityCart 
            },
            addProduct (product) {
                let id = product
                //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
                let prod = catalog._createNewProduct (product)
                
                let find = this.items.find (product => product.product_id === id)
                if (find) {
                    find.quantity++
                } else {
                    prod.quantity = 1
                    this.items.push (prod)
                }
                this._calculateSum ()
                this._checkTotal ()
                this._renderQuantityCart ()
                this._renderProductCart ()
                // cart.items.push (Object.assign ({}, find, {quantity: 1}))
            },
            deleteProduct (product) {
                let id = product
                //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
                
                let find = this.items.find (product => product.product_id === id)
                let findId = this.items.indexOf (find)
                console.log(findId)
                    if (typeof find == "object") {
                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.items.splice (findId, 1)
                        }
                    }else {
                        return console.log(`Товара с id ${product} не найден`)
                    }
                this._calculateSum ()
                this._checkTotal ()
                this._renderQuantityCart ()
            },
            _calculateSum () {
                let arr = [];
                let sum = (cart.items.forEach (el => {arr.push(el.price * el.quantity)}))
                let totalSum = 0
                 for (let i = 0; i < arr.length; i++) {
                     totalSum += arr[i]
                 }
                 return(totalSum)
            },
            _checkTotal () {
                let arr = [];
                let total = (cart.items.forEach (el => {arr.push(el.quantity)}))
                let allTotal = 0;
                    for(let i = 0; i < arr.length; i++) {
                        allTotal += arr[i]
                    }
                console.log(`В корзине ${allTotal} товаров`)
                return (allTotal)
            },
            _renderQuantityCart () {
                if (cart.items.length > 0){
                    document.querySelector("#cart").innerHTML = `Корзина (${this._checkTotal ()})`
                } else {
                    return console.log(`Корзина пуста`)
                }
            },
            _renderProductCart () {
                let docDiv = document.querySelector('#div-cart')
                if (this.items.length > 0) {
                    str = ''
                    this.items.forEach (el => {
                        str += `<div class = element-cart>
                        <p>Наименование ${el.product_name} </p>
                        <p>Колличество ${el.quantity} шт.</p>
                        <i>${el.price * el.quantity}$</i>
                        </div>
                        <hr>
                        `
                    })
                    docDiv.innerHTML = (str)
                    document.querySelector("#div-cart").innerHTML += `
                    <p>Итог: ${this._calculateSum ()}$</p>
                    <hr>
                    `
                } else {
                    console.log(test)
                }
            }
        }
        catalog.construct  () //тут происходит создание объекта и вся прочая магия

        // function getData () {
        //     for (let i = 0; i < IDS.length; i++) {
        //         products.push (createNewProduct (i))
        //     }
        // }

        // function createNewProduct (index) {
        //     return {
        //         product_name: PRODUCTS_NAMES [index],
        //         price: PRICES [index],
        //         product_id: IDS [index]
        //     }
        // }

        // function addProduct (id) {
        //     let find = products.find (el => el.product_id === id)
        //     cart.items.push (Object.assign ({}, find, {quantity: 1}))
        // }
document.getElementById('cart').addEventListener ('click', openCart) // находим кнопку корзины и вешаем на нее функцию переключения класса
    
function openCart () {
    let tog = document.querySelector('#div-cart')
    tog.classList.toggle('active')
}