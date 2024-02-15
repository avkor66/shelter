
const btnToggle = document.getElementById('btn-toggle')
const menuToggle = document.getElementById('toggle-menu')
const navMenuItem = document.querySelectorAll('.nav-menu-item')
let flag = false
let rand = Math.floor(Math.random() * 8)

btnToggle.addEventListener('click', (event) => {
    if (flag) {
        menuToggle.classList.add('transition-toggle-menu-leave')
        menuToggle.classList.remove('transition-toggle-menu')
        btnToggle.classList.remove('rotate')
        btnToggle.classList.add('rotate-leave')
        flag = false
        document.querySelector('.modal__menu').remove()
        document.querySelector('.friends').style.zIndex = 'auto'
        document.querySelector('.footer').style.zIndex = 'auto'

    } else {
        menuToggle.classList.add('transition-toggle-menu')
        btnToggle.classList.add('rotate')
        btnToggle.classList.remove('rotate-leave')
        flag = true
        const cardPets_ = document.createElement('div')
        cardPets_.classList.add('modal__menu')
        cardPets_.style.top = (event.pageY-event.clientY)+'px'
        menuToggle.style.top = (event.pageY-event.clientY)+'px'
        document.querySelector('.head').style.position = 'absolute'
        document.querySelector('.head').style.zIndex = 'auto'
        document.querySelector('.head').style.top = (event.pageY-event.clientY)+'px'
        document.querySelector('.friends').style.zIndex = '-1'
        document.querySelector('.footer').style.zIndex = '-1'

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
menuToggle.addEventListener('animationend', (event) => {
    menuToggle.classList.remove('transition-toggle-menu-leave')
    if (!flag) {
        document.querySelector('.head').style.position = 'fixed'
        document.querySelector('.head').style.top = '0px'
        document.querySelector('.head').style.zIndex = '1'
        document.querySelector('.friends').style.zIndex = 'auto'
        document.querySelector('.footer').style.zIndex = 'auto'

    }
})

navMenuItem.forEach(line => {
    line.addEventListener('click', (ev) => {
        menuToggle.classList.remove('transition-toggle-menu')
        btnToggle.classList.remove('rotate')
        btnToggle.classList.add('rotate-leave')
        flag = false
        document.querySelector('.head').style.position = 'fixed'
        document.querySelector('.head').style.zIndex = '1'
        document.querySelector('.modal__menu').remove()
    })        
})

const card = document.querySelectorAll('.friends__blocks__items__item')

card.forEach(line => {
    line.addEventListener('click', ev => {
        document.body.insertAdjacentElement('afterbegin', createCard(ev.pageY-ev.clientY, 'hello'))
        const modal = document.querySelector('.modal')
        document.getElementById('modal-close').addEventListener('click', () => {
            modal.remove()
        })
        modal.addEventListener('click', (ev) => {
            const clk = ev.target.classList[0] 
            if (clk === 'modal') {
                modal.remove()
            } else {
                console.log('ha');
            }
        })
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
    

function createCard(scroll, params=0) {
    const cardPets = document.createElement('div')
    cardPets.classList.add('modal')
    cardPets.style.top = scroll+'px'
    cardPets.insertAdjacentHTML('afterbegin', template(params))
    return cardPets
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

const blocks = document.querySelector('#blocks')


const templateCard = (data) => {
    return `
    <div class="friends__blocks__items__item__img">
        <img src="${data.img}" alt="pets-${data.name.toLowerCase()}">
    </div>
    <div class="friends__blocks__items__item__name">
        ${data.name}
    </div>
    <div class="friends__blocks__items__item__btn">
        Learn more
    </div>
    `
}
const createCardTemplate = () => {
    const card = document.createElement('div')
    card.classList.add('friends__blocks__items__item')
    return card
}
function cardListener() {
    const carder = document.querySelectorAll(`.friends__blocks__items__item`)
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

const currentPage = document.querySelector('#current-page')
const nextPage = document.querySelector('#next-page')
const previousPage = document.querySelector('#previous-page')
const lastPage = document.querySelector('#last-page')
const firstPage = document.querySelector('#first-page')
const arr = []
let _currentPage = 1
let _nextPage = _currentPage + 1
let _previousPage
let _firstPage = 1
let _lastPage

    _lastPage = 6
    for (let i = 0; i < 6; i++) {
        const array = []
        for (let i = 0; i < 8; i++) {
            array.push(rand++)
            if (rand === 8) rand = 0
        }
        shuffle(array)
        arr.push(array)
    }
    
    function addPage(page) {
        blocks.innerHTML = ''
        for(let i = 0; i < 8; i++) {
            const newCard = createCardTemplate()
            newCard.dataset.id = arr[page-1][i]
            newCard.innerHTML = templateCard(pets[arr[page-1][i]])
            blocks.appendChild(newCard)
        }
        currentPage.innerText = page
        cardListener()
    }


let tPage = 0

if (window.screen.width < 1280 && window.screen.width >= 768) {
    _lastPage = 8
    for (let i = 0; i < 8; i++) {
        const array = []
        for (let i = 0; i < 6; i++) {
            array.push(rand++)
            if (rand === 8) rand = 0
        }
        shuffle(array)
        arr.push(array)
    }
    
    function addPage(page) {
        blocks.innerHTML = ''
        for(let i = 0, j = tPage; i < 6; i++) {
            const newCard = createCardTemplate()
            newCard.dataset.id = arr[page-1][j]
            newCard.innerHTML = templateCard(pets[arr[page-1][j]])
            blocks.appendChild(newCard)
            j++
            tPage++
            if (tPage === 6) {
                tPage = 0
                j = tPage
            }
        }
        currentPage.innerText = page
        cardListener()
    }

}    

if (window.screen.width < 768) {
    _lastPage = 16
    for (let i = 0; i < 16; i++) {
        const array = []
        for (let i = 0; i < 3; i++) {
            array.push(rand++)
            if (rand === 8) rand = 0
        }
        shuffle(array)
        arr.push(array)
    }
    
    function addPage(page) {
        blocks.innerHTML = ''
        for(let i = 0, j = tPage; i < 3; i++) {
            const newCard = createCardTemplate()
            newCard.dataset.id = arr[page-1][j]
            newCard.innerHTML = templateCard(pets[arr[page-1][j]])
            blocks.appendChild(newCard)
            j++
            tPage++
            if (tPage === 3) {
                tPage = 0
                j = tPage
            }
        }
        currentPage.innerText = page
        cardListener()
    }

}    




previousPage.classList.add('no_active')
firstPage.classList.add('no_active')


const last = () => {
    
    addPage(_lastPage)
    
    
    lastPage.removeEventListener('click', last)
    nextPage.removeEventListener('click', next)
    nextPage.classList.add('no_active')
    lastPage.classList.add('no_active')
        firstPage.classList.remove('no_active')
        previousPage.classList.remove('no_active')
        previousPage.addEventListener('click', previous)
        firstPage.addEventListener('click', first)

    _nextPage = _lastPage + 1
    _currentPage = _lastPage
    _previousPage = _lastPage - 1

}

const previous =  () => {
    if (_currentPage === _lastPage) {
        lastPage.classList.remove('no_active')
        nextPage.classList.remove('no_active')
        lastPage.addEventListener('click', last)
        nextPage.addEventListener('click', next)
    }
    addPage(_previousPage)

    _nextPage--
    _currentPage--
    _previousPage = _currentPage - 1
    

    if (_currentPage === 1) {
        previousPage.removeEventListener('click', previous)
        firstPage.removeEventListener('click', first)
        previousPage.classList.add('no_active')
        firstPage.classList.add('no_active')
    }

}
const first = () => {
    if (_currentPage === _lastPage) {
        lastPage.classList.remove('no_active')
        nextPage.classList.remove('no_active')
        lastPage.addEventListener('click', last)
        nextPage.addEventListener('click', next)
    }

    addPage(_firstPage)

    _nextPage = _firstPage + 1
    _currentPage = _firstPage
    _previousPage = _currentPage - 1
    
    previousPage.removeEventListener('click', previous)
    firstPage.removeEventListener('click', first)
    previousPage.classList.add('no_active')
    firstPage.classList.add('no_active')
}


const next = () => {
    addPage(_nextPage)
    
    if(_currentPage === 1) {
        firstPage.classList.remove('no_active')
        previousPage.classList.remove('no_active')
        previousPage.addEventListener('click', previous)
        firstPage.addEventListener('click', first)
    }
    if (_nextPage === _lastPage) {
        nextPage.classList.add('no_active')
        lastPage.classList.add('no_active')
        nextPage.removeEventListener('click', next)
        lastPage.removeEventListener('click', last)
    }
    _nextPage++
    _currentPage++
    _previousPage = _currentPage - 1

}


document.addEventListener('DOMContentLoaded', () => {

    nextPage.addEventListener('click', next)
    lastPage.addEventListener('click', last)
    
    
    addPage(_currentPage)
})
