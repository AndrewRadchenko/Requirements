[Назад](../javascript-requirements.md)

# Требования к классам JavaScript

## Базовые требования

Применение классов JS обязательно во всех случаях, где имеются признаки работы с данными (ввод, отображение, запрос, получение), изменение объектов DOM под влиянием данных и в результате взаимодейтвия с пользователем, где имеются признаки состояний.

Комплексные объекты DOM линкуются на соответствующих класс. Все состояния, поведения и работа с данными описывается методами. Любые взаимодействия с залинкованными объектами DOM и внешними объектами осуществляются через события и тригеры, инкапсулированные в объект.

Внутренние процессы класса реализуются за счет условно приватных методов ```this._privateFunction()```

Внешнее взаимодействие с объектом осуществляется через:

- условно публичные методы ```classInstance.publicFunction()```
- события экземпляра класса ```$(classInstance).on(classInstance.events.eventName,function());```

Каждый класс описывается в отдельном файле. Имя файла соответствует имени класса.

## Пример класса

Ниже приведён пример класса, частично описывающего взаимодействие с таблицей товаров, которые отображаются на странице оформления заказа.

Применение данной структуры класса является обязательной (<a href="/Requirements/src/files/TemplateClass.js" download>Скачать шаблон</a>).


```js

//ulib/classes/CartFormClass.js

+function($){

    //функция определяет, какие методы должны выполниться на этапе инициализации
    function CartFormClass(config) {
        this._init(config);
        this._listenActions();
    }

    //Определяются настройки класса, которые применяются по умолчанию
    CartFormClass.DEFAULTS = {
        //через jQuery линкуются объекты DOM 
        dom: {
            block: $('[js-cart="block"]')
        },
        //определяются события класса
        events: {
            objectReady: 'objectReady'
        },
        //определяются параметры и вспомогательные данные
        options: {
            selectors:{
                itemBlock: '[js-cart="item"]'
            }
        },
        //определяются все ячекци данных, которые будут использоваться и храниться в классе
        data: {
            total: {
                weight: null,   //kg 0.000
                length: null,   //cm 0.00
                width:  null,   //cm 0.00
                height: null,   //cm 0.00
                amount: null,   //cbm 0.0000
                sum:    null,   //0.00
                currency: 'RUB' //ICO
            },
            items: []           //{}, each item has same data as total plus item price, quantity, itemId and name
        },
        //если в классе используются вспомогательные классы, они хранятся здесь 
        objects: {
            //someApi: new Api,
            //someObjects
        }
    };

    CartFormClass.prototype.constructor = CartFormClass;

    CartFormClass.prototype.dom = {};
    CartFormClass.prototype.events = {};
    CartFormClass.prototype.options = {};
    CartFormClass.prototype.data = {};
    CartFormClass.prototype.objects = {};

    //Обязательный метод, который вызывает все внутренние процессы и методы, которые должны быть вызваны на этапе инициализации класса
    CartFormClass.prototype._init = function(config) {

        //Слияние дефолтных параметров и тех параметров, которые переданы в конфиге при инициализации функции
        this.dom = $.extend({},CartFormClass.DEFAULTS.dom,config.dom);
        this.events = $.extend({},CartFormClass.DEFAULTS.events,config.events);
        this.options = $.extend({},CartFormClass.DEFAULTS.options,config.options);
        this.data = $.extend({},CartFormClass.DEFAULTS.data,config.data);

        //Вызываются private методы, которые необходимы для инициализации функции
        this._parseCart();
        this._calculateCart();

    };

    //Обязательный метод, в котором определяются слушатели внутренних событий и реакция на них
    CartFormClass.prototype._listenActions = function() {

        //например, слушатели изменения формы, нажатия на кнопки и т.д.

    };

    //Условно публичные методы, которые могут вызываться за пределами экземпляра класса
    CartFormClass.prototype.getCartTotalData = function() {

        return this.data.total;

    };

    //Условно private методы (начинаются с "_" ), которые можно вызывать только внутри класса
    CartFormClass.prototype._parseCart = function() {

        let itemsArray = this.dom.block.find(this.options.selectors.itemBlock).toArray();

        this.data.items = [];

        for(let i in itemsArray){

            let unpreparedItemData = $(itemsArray[i]).data();

            itemData = {
                itemId:     parseInt(unpreparedItemData.id),
                name:       unpreparedItemData.name,
                quantity:   parseFloat(unpreparedItemData.quantity),
                price:      parseFloat(unpreparedItemData.price),
                sum:        parseFloat(unpreparedItemData.price)*parseFloat(unpreparedItemData.quantity),
                currency:   unpreparedItemData.currency? unpreparedItemData.currency : 'RUB',
                weight:     parseFloat(unpreparedItemData.weight),
                length:     parseFloat(unpreparedItemData.length),
                width:      parseFloat(unpreparedItemData.width),
                height:     parseFloat(unpreparedItemData.height),
                amount:     parseFloat(unpreparedItemData.length)*parseFloat(unpreparedItemData.width)*parseFloat(unpreparedItemData.height)/Math.pow(1000,3)
            };

            this.data.items.push(itemData);
        }



    };

    CartFormClass.prototype._calculateCart = function(){

        this.data.total = {
            weight: 0,
            length: 0,
            width:  0,
            height: 0,
            amount: 0,
            sum:    0,
            currency: 'RUB'
        };

        for(let i in this.data.items){
            let item = this.data.items[i];

            this.data.total.weight = this.data.total.weight + item.weight;
            this.data.total.sum = this.data.total.sum + item.sum;
            this.data.total.amount = this.data.total.amount + item.amount;
            this.data.total.width = this.data.total.length = this.data.total.height = Math.round(Math.cbrt(this.data.total.amount)*100);
        }

    };

    //функция, с помощью которой можно создать экземпляр класса
    $.newCartFormClass = function(config) {
        return new CartFormClass(config || {});
    };

}(jQuery);

```

[Назад](../javascript-requirements.md)

## Другие разделы

[**Требования к сервисным функциям JS**](service-functions.md)
  
[**Требования к контроллерам js**](controller.md)