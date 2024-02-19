const btnToggle = document.getElementById('btn-toggle')
const menuToggle = document.getElementById('toggle-menu')
const navMenuItem = document.querySelectorAll('.nav-menu-item')
let flag = false
let rand = Math.floor(Math.random() * 8)

window.onscroll = function(){
    return false;
  }
btnToggle.addEventListener('click', () => {
    if (flag) {
        menuToggle.classList.add('transition-toggle-menu-leave')
        menuToggle.classList.remove('transition-toggle-menu')
        btnToggle.classList.remove('rotate')
        btnToggle.classList.add('rotate-leave')
        flag = false
        document.querySelector('.modal__menu').remove()
    } else {
        menuToggle.classList.add('transition-toggle-menu')
        btnToggle.classList.add('rotate')
        btnToggle.classList.remove('rotate-leave')
        flag = true
        const cardPets_ = document.createElement('div')
        cardPets_.classList.add('modal__menu')
        document.body.insertAdjacentElement('afterbegin', cardPets_)
   
        document.querySelector('.modal__menu').addEventListener('click', () => {
            menuToggle.classList.add('transition-toggle-menu-leave')

            menuToggle.classList.remove('transition-toggle-menu')
            btnToggle.classList.remove('rotate')
            btnToggle.classList.add('rotate-leave')
            flag = false
            document.querySelector('.modal__menu').remove()    
        })

    }
})
menuToggle.addEventListener('animationend', () => {
    menuToggle.classList.remove('transition-toggle-menu-leave')

})

navMenuItem.forEach(line => {
    line.addEventListener('click', (ev) => {
        menuToggle.classList.remove('transition-toggle-menu')
        btnToggle.classList.remove('rotate')
        btnToggle.classList.add('rotate-leave')
        flag = false
        document.querySelector('.modal__menu').remove()

    })        
})



const template = (set) => {

return `
        <div class="modal__content">
            <div class="modal__content__close" id="modal-close">
                <img src="../../assets/icons/vector.svg" alt="vector">
            </div>
            <div class="modal__content__img">
                <img src="${pets[set].img}" alt="${pets[set].name}">
            </div>
            <div class="modal__content__card">
                <div class="modal__content__card__title">
                ${pets[set].name}
                </div>
                <div class="modal__content__card__poroda">
                ${pets[set].type} - ${pets[set].breed}
                </div>
                <div class="modal__content__card__description">
                ${pets[set].description}
                </div>
                <ul class="modal__content__card__list">
                    <li><span>Age:</span> ${pets[set].age}</li>
                    <li><span>Inoculations:</span> ${pets[set].inoculations.join(', ')}</li>
                    <li><span>Diseases:</span> ${pets[set].diseases.join(', ')}</li>
                    <li><span>Parasites:</span> ${pets[set].parasites.join(', ')}</li>
                </ul>
            </div>
        </div>
        `
}


function createCard(scroll, params) {
    const cardPets = document.createElement('div')
    cardPets.classList.add('modal')
    cardPets.style.top = scroll+'px'
    cardPets.insertAdjacentHTML('afterbegin', template(params))
    return cardPets
}


const btn_left = document.querySelector('#btn-left')
const btn_right = document.querySelector('#btn-right')
const carousel = document.querySelector('#carousel')
const itemLeft = document.querySelector('#item-left')
const itemRight = document.querySelector('#item-right')
const itemActive = document.querySelector('#item-active')


const moveLeft = () => {
    carousel.classList.add('transition-left')
    btn_left.removeEventListener('click', moveLeft)
    btn_right.removeEventListener('click', moveRight)
}
const moveRight = () => {
    carousel.classList.add('transition-right')
    btn_left.removeEventListener('click', moveLeft)
    btn_right.removeEventListener('click', moveRight)
}

btn_left.addEventListener('click', moveLeft)
btn_right.addEventListener('click', moveRight)



const createCardTemplate = () => {
    const card = document.createElement('div')

    card.classList.add('friends__blocks__carousel__items__item')

    return card
}
carousel.addEventListener('animationend', (animationEvent) => {
    
    let changeItem;

    if (animationEvent.animationName === 'to-left' || animationEvent.animationName === 'to-left-des' || animationEvent.animationName === 'to-left-tab') {
        carousel.classList.remove('transition-left')
        changeItem = itemRight
        itemActive.innerHTML = itemRight.innerHTML
    } else {
        carousel.classList.remove('transition-right')
        changeItem = itemLeft
        itemActive.innerHTML = itemLeft.innerHTML
    }
    
    changeItem.innerHTML = ''

    if (window.screen.width < 768) {
        for (let i = 0; i < 2; i++) {
            const card = createCardTemplate()
            card.dataset.id = rand
            card.innerHTML = templateCard(pets[rand++])
            changeItem.appendChild(card)
            if (rand === 8) rand = 0
            
        }
    } else if (window.screen.width < 1280) {
        for (let i = 0; i < 2; i++) {
            const card = createCardTemplate()
            card.dataset.id = rand
            card.innerHTML = templateCard(pets[rand++])
            changeItem.appendChild(card)
            if (rand === 8) rand = 0
            
        }
    } else {
        for (let i = 0; i < 3; i++) {
            const card = createCardTemplate()
            card.dataset.id = rand
            card.innerHTML = templateCard(pets[rand++])
            changeItem.appendChild(card)
            if (rand === 8) rand = 0
        }
    }
    cardListener()

    btn_left.addEventListener('click', moveLeft)
    btn_right.addEventListener('click', moveRight) 



})

function cardListener() {
    const carder = document.querySelectorAll(`.friends__blocks__carousel__items__item`)
    carder.forEach(line => {
        line.addEventListener('click', ev => {
            
            document.body.insertAdjacentElement('afterbegin', createCard(ev.pageY-ev.clientY, ev.currentTarget.dataset.id))
            const modal = document.querySelector('.modal')
            document.getElementById('modal-close').addEventListener('click', () => {
                modal.remove()
            })
            modal.addEventListener('click', (ev) => {
                const clk = ev.target.classList[0] 
                if (clk === 'modal') {
                    modal.remove()
                } 
            })
        })
    })

}
const templateCard = (data) => {
    return `
    <div class="friends__blocks__carousel__items__item__img">
        <img src="${data.img}" alt="pets-${data.name.toLowerCase()}">
    </div>
    <div class="friends__blocks__carousel__items__item__name">
        ${data.name}
    </div>
    <div class="friends__blocks__carousel__items__item__btn">
        Learn more
    </div>
    `
}


document.addEventListener('DOMContentLoaded', () => {
    itemActive.innerHTML = ''
        for(let i = 0; i < 3; i++) {
            const card = createCardTemplate()
            card.dataset.id = rand
            card.innerHTML = templateCard(pets[rand++])
            itemActive.appendChild(card)
            if (rand === 8) rand = 0
        }  
        for(let i = 0; i < 3; i++) {
            const card = createCardTemplate()
            card.dataset.id = rand
            card.innerHTML = templateCard(pets[rand++])
            itemLeft.appendChild(card)
            if (rand === 8) rand = 0
        }
    // } else if (window.screen.width <= 1279 && window.screen.width >= 768) {
        
    //     const card1280 = createCardTemplate()
    //     card1280.dataset.id = rand
    //     card1280.innerHTML = templateCard(pets[rand++])
    //     itemActive.appendChild(card1280)
    //     if (rand === 8) rand = 0
    //     const card1280_2 = createCardTemplate()
    //     card1280_2.dataset.id = rand
    //     card1280_2.innerHTML = templateCard(pets[rand++])
    //     itemActive.appendChild(card1280_2)
    //     if (rand === 8) rand = 0


    //     const card1280_ = createCardTemplate()
    //     card1280_.dataset.id = rand
    //     card1280_.innerHTML = templateCard(pets[rand++])
    //     itemLeft.appendChild(card1280_)
    //     if (rand === 8) rand = 0
    //     const card1280__ = createCardTemplate()
    //     card1280__.dataset.id = rand
    //     card1280__.innerHTML = templateCard(pets[rand++])
    //     itemLeft.appendChild(card1280__)
    //     if (rand === 8) rand = 0


    // } else {
    //     const card768 = createCardTemplate()
    //     card768.dataset.id = rand
    //     card768.innerHTML = templateCard(pets[rand++])
    //     itemActive.appendChild(card768)
    //     if (rand === 8) rand = 0

    //     const card768_ = createCardTemplate()
    //     card768_.dataset.id = rand
    //     card768_.innerHTML = templateCard(pets[rand++])
    //     itemLeft.appendChild(card768_)
    //     if (rand === 8) rand = 0

        
    // }
    itemRight.innerHTML = itemLeft.innerHTML

    cardListener()


})