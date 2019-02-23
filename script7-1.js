//аккордеон

var $accordion = document.querySelector('#accordion');

function handleTabClick(event) {
    'use strict';
    var i = 0;
    var $contents = document.querySelectorAll('.content');
    var $content = document.querySelector(event.target.getAttribute('href'));

    if (event.target.tagName === 'A') {
        var $nextStepButton = document.getElementById('nextStepButton');
        for (var j = 0; j < $contents.length; j++) {
            $contents[j].classList.remove('active');
        }

        if ($content.classList.contains('comment')) {
            $nextStepButton.innerText = 'Make order';
        } else {
            $nextStepButton.innerText = 'Next';
        }

        if ($content.classList.contains('delivery') || $content.classList.contains('comment')) {
            $products.classList.add('none');
            $accordion.classList.add('accordionMargin');
        } else {
            $products.classList.remove('none');
            $accordion.classList.remove('accordionMargin');
        }
        $content.classList.toggle('active');
    }

    while (i < $contents.length) {
        if ($contents[i].classList.contains('active')) {
            if (event.target.id === 'nextStepButton') {
                switch (i) {
                    case 0:
                        $contents[i].classList.remove('active');
                        $contents[i + 1].classList.add('active');
                        $products.classList.add('none');
                        $accordion.classList.add('accordionMargin');
                        i++;
                        break;
                    case 1:
                        $contents[i].classList.remove('active');
                        $contents[i + 1].classList.add('active');
                        $products.classList.add('none');
                        $accordion.classList.add('accordionMargin');
                        $nextStepButton = document.getElementById('nextStepButton');
                        $nextStepButton.innerText = 'Make order';
                        i++;
                        break;
                        /* case 2:
                             $contents[i].classList.remove('active');
                             $products.classList.remove('none');
                             $accordion.classList.remove('accordionMargin')
                         default: // зациклить, потом можно убрать
                             i = 0;
                             $contents[i].classList.add('active');*/
                }
            }
        }
        i++;
    }
    event.preventDefault();
}
$accordion.addEventListener('click', handleTabClick);

//Корзина

var cart = [];

var $products = document.getElementById('products');
var $cart = document.getElementById('cart');
var $template = document.getElementById('template').children[0];

$products.addEventListener('click', function (event) {
    if (event.target.className === 'buy') {
        var $parent = event.target.parentNode;
        var name = $parent.querySelector('.name').textContent;
        var price = $parent.querySelector('.price').textContent;
        var index = -1;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                index = i;
            }
        }

        if (index !== -1) {
            cart[index].quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1,
            });
        }
        buildCart();
    }
});

$cart.addEventListener('click', function (event) {
    if (event.target.className === 'removeProduct') {
        removeProduct();
    }
});

function removeProduct() {
    $cart.innerHTML = '';
    if (cart.length > 0) {
        var $parent = event.target.parentNode;
        var $productId = $parent.id;

        if (cart[$productId].quantity > 1) {
            $parent.querySelector('.quantity').textContent = cart[$productId].quantity--;
        } else if (cart[$productId].quantity === 1) {
            cart.splice($productId, 1);
        }
    } else {
        $cart.innerHTML = 'Cart is empty!';
    }
    buildCart();
}

var $sum = document.createElement('div');
$sum.classList.add('summa');
var $container = document.getElementById('container');
$container.appendChild($sum);
$sum.innerHTML = '';

function allPrice(arr) {
    var sumAll = 0;
    for (var i = 0; i < arr.length; i++) {
        var sum = arr[i].price * arr[i].quantity;
        sumAll += sum;
    }

    if (arr.length !== 0) {
        $sum.innerHTML = 'Items price in the cart: ' + sumAll + '$';
    } else {
        $sum.innerHTML = 'Items price in the cart: ' + sumAll + '$';
    }
}

function buildCart() {
    $cart.innerHTML = '';
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            var $item = $template.cloneNode(true);
            $item.querySelector('.name').textContent = cart[i].name;
            $item.querySelector('.price').textContent = cart[i].price;
            $item.querySelector('.quantity').textContent = cart[i].quantity;
            $item.id = i;
            $cart.appendChild($item);
        }
        allPrice(cart);
    } else {
        allPrice(cart);
        $cart.innerHTML = 'Cart is empty!'
    }
}

buildCart();
