[Назад](../javascript-requirements.md)

# Требования к контроллерам JavaScript

Для инициализации и управления экземплярами классов используются контроллеры.

Контроллер может вызывать публичные методы классов, реагировать на события экземпляров классов, обеспечивать взаимодействие нескольких классов.

Контроллеры храняться в отдельной директории и загружаются только на тех страницах, где они необходимы.

Каждый контроллер также является классом.

Контроллер абстрагирует один или несколько классов, работа которых направлена на реализацию одной глобальной задачи.
Например, могут быть следующие контроллеры:

- контроллер полной корзины (этапов оформления закза)
- контроллер краткой корзины (можно использовать на разных страницах сайта)
- контроллер формы обратной связи
- контроллер онлайн чата
- контроллер интерактивностей на странице карточки товара

и т.д.

## Пример контроллера

Ниже приведен пример частичной реализации контроллера оформления заказа.

Применение контроллеров по примеру, указанному ниже, является обязательным. Не допускается описание интерактива и работа с данными вне абстракций, без инкапсуляции в классы и контроллеры. Простыми словами - портянки не принимаются.

```js


+function($){

    function CartCheckoutController(config) {
        this._init(config);
        this._listenActions();
    }

    CartCheckoutController.DEFAULTS = {
        objects: {}
    };

    CartCheckoutController.prototype.constructor = CartCheckoutController;

    CartCheckoutController.prototype.objects = {};

    CartCheckoutController.prototype._init = function(config) {

        this.objects = $.extend({},CartCheckoutController.DEFAULTS.objects,config.objects);

        //В данном примере контроллер оперирует только объектами (экземплярами классов), 
        // поэтому в его свойствах не определены dom, options, events.
        // Тем не менее, технически использование данных свойств ничем не ограничены.
        // Главное не подменять контроллером обычные классы, которые управляют элементами DOM
        
        //Ниже контроллер инициализирует экземпляры всех необходимых классов
        // и сохраняет их в собственные свойства
        
        this.objects.cityOfDeliveryForm = $.newCityOfDeliveryFormClass();
        this.objects.shippingMethodForm = $.newShippingMethodFormClass();
        this.objects.cartForm = $.newCartFormClass();
        this.objects.buyerData = $.newBuyerDataFormClass();

    };

    CartCheckoutController.prototype._listenActions = function() {
        
        //Ниже на все инициализированные экземпляры классов поставлены слушатели событий.
        // Например, когда в одном из экземпляров класса тригерится событие обновления адреса,
        // в этом случае контроллер запускает обновление других классов, передавая в них обновленные данные (newAddress)
        
        let cityOfDeliveryForm = this.objects.cityOfDeliveryForm;
        let shippingMethodForm = this.objects.shippingMethodForm;
        let cartForm = this.objects.cartForm;
        let buyerData = this.objects.buyerData;


        $(cityOfDeliveryForm).on(cityOfDeliveryForm.events.citySelected,function(e,cityData){
            let cartTotalData = cartForm.getCartTotalData();
            shippingMethodForm.updateAvailableMethods(cityData,cartTotalData);
        });

        $(shippingMethodForm).on(shippingMethodForm.events.methodChanged,function(e,shippingData){
            console.log(shippingData);
        });

        $(shippingMethodForm).on(shippingMethodForm.events.serviceAction,function(e,actionName){
            switch (actionName){
                case "focuscity":
                    cityOfDeliveryForm.focusCity();
                    break;
                case "focusaddress":
                    buyerData.focusAddressInput();
                    break;
                default:
                    break;
            }
        });

        $(buyerData).on(buyerData.events.addressUpdated,function(e,newAddress){
            cityOfDeliveryForm.updateCityData(newAddress);
        });

        //

    };



    $.newCartCheckoutController = function(config) {
        return new CartCheckoutController(config || {});
    };

}(jQuery);


//Как только страница загружена полностью, запускается контроллер

$(document).ready(function(){

    $.newCartCheckoutController();

});


```

[Назад](../javascript-requirements.md)

## Другие разделы

[**Требования к сервисным функциям JS**](service-functions.md)
 
[**Требования к классам js**](class.md)
 