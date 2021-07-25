let cart = [];
/* variavel de array que é o carrinho */
let modalQt = 1;
/* variavel "modalQt" criada para iniciar o contador de quantidade em "1" */
let modalKey = 0;
/* Identificação de qual pizza é */
const c = (el) => document.querySelector(el);
/* conts c retorna o item encontrado */
const cs = (el) => document.querySelectorAll(el);
/*  conts cs retorna um array com os itens encontrados */

/* Listagem das pizzas */

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    /* Criou a variável "pizzaItem, e dentro dela foram copiados os conteúdos das classes "models e "pizza-item", usando o cmd "cloneNode" para clonar o conteúdo */

    pizzaItem.setAttribute('data-key', index);
    /* Pega a class pizzaItem e seta atributos 'data-key' e 'index', inseriu em pizzaItem a chave de acesso da pizza especifica*/


    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    /* Dentro da class "pizzaItem" onde tem a class "pizza-item--img e em seguida junto acessado "img", foi inserido o dado img contido em "item.img*/

    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    /* Dentro da class "pizzaItem" onde tem a class "pizza-item--price, foi inserido o dado price contido em "item.price, foi usado o Template String para concatenar corretamente o R e o cifrão, bem como, o "toFixed(2), para duas casas depois da vírgula*/

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    /* Dentro da class "pizzaItem" onde tem a class "pizza-item--name, foi inserido o dado name contido em "item.name*/

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    /* Dentro da class "pizzaItem" onde tem a class "pizza-item--desc, foi inserido o dado description contido em "item.description*/

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        /* o querySelector acessou a class "pizzaItem e a tag "a" dentro dela, em seguida foi adicionado por parâmentro os eventos de click e um arrow function "e" seguido pelo cmd "e.preventDefault();" para prevenir o evento padrão de atualizar a tela quando clica*/


        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;
        /* volta o atributo quantidade do modal para 1 sempre que aberto */
        modalKey = key;


        c('.pizzaBig img').src = pizzaJson[key].img;
        /* pizzaBig img recebe por src a imagem da pizza pelo key da Json e coloca no modal */

        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        /* pizzaInfo h1 recebe por innerHTML o nome da pizza pelo key da Json e coloca no modal */

        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        /* pizzaInfo--desc recebe por innerHTML as informações da pizza pelo key da Json e coloca no modal */

        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        /* pizzaInfo--actualPrice recebe por innerHTML o valor da pizza pelo key da Json e coloca no modal */

        c('.pizzaInfo--size.selected').classList.remove('selected');
        /* a cons "c" pega as class "pizzaInfo--size.selected" acessa sua class list e usa a ação "remove", para remover o item selecionado, resetando sempre  */

        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            /* if se confirmado, acessa o item size, a sua classList e então adiciona a classe "selected" */

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        /* cria um loop para cada size, gerando os tamanhos no no modal */

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        /* a const "c" acessa a class "pizzaWindowArea" e nela executa a ação de opacity, porém em "0", está na tela o modal, porém invisível */

        c('.pizzaWindowArea').style.display = 'flex';
        /* a const "c" que está recebendo "document.querySelector" acessa a class ".pizzaWindowArea" que é o modal, e transforma para display flex, pois a mesma está originalmente com display "none" no css para não aparecer*/

        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });
    /* A função "SetTimeout manda que, após "c" aceesar a class "pizzaWindowArea", adicione a ação de opacity em "1 seg", após o tem dos 200 ms */



    c('.pizza-area').append(pizzaItem);
    /* Chama a classe "pizza-area" e com o cmd "append" ADICIONA mais itens conforme o que for passado pela variável "pizzaItem" */
});

/* Eventos do MODAL */
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
    /* FUnção de nome "closeModal" chama a const "c" acessa a classe "pizzaWindowArea" e executa a ação "style.opacity e posteriormente o cmd setTimeout faz a ação display none" */
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
    /* const "cs" acessa as classes ".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton", em segida a func. "forEach"(para cada um deles), acessa o próprio item, e adiciona o evento "click" e "closeModal"  */
});
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item) => item.identifier == identifier);
    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt,
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();

            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });
            c('.cart').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vh';
    }
}