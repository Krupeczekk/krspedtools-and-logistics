function ChangeTaskCategory(name) {
    if (name == page) {
        return
    }

    $(`#${page}`).css('display', 'none')
    $(`#${name}`).css('display', 'flex')
    page = name
}

$(function () {
    $('.mypage-title').text(Config.PageName)
    $('.mypage-year').text(Config.Year)
    $('.mainpage-title-description').text(Config.MainPageDesc)
})

$(function () {
    $('.navbar-menu').html(``)
    $('.toggle').on('click', function () {
        if ($('.navbar-menu').hasClass('active')) {
            $('.navbar-menu').removeClass('active')
            $(this).find('a').html('<i class="fa-solid fa-bars"></i>')
        } else {
            $('.navbar-menu').addClass('active')
            $(this).find('a').html('<i class="fa-solid fa-xmark"></i>')
        }
    })

})

$(function () {
    let $menuItem
    for (let i of Config.Menu) {
        if (!i.event) {
            $menuItem = $(`<li><a href="${i.fileName}.html" class="hoverline">${i.optionName}</a></li>`)
        } else {
            $menuItem = $(`<li><a class="hoverline" style="font-weight: 600;" onclick="ToggleCalculator()">${i.optionName}</a></li>`)
        }
        $('.navbar-menu').append($menuItem)
    }
})


$(function () {
    $('.mainpage-page-informations').html(``)

    for (let i of PQuestions) {
        const $pageInfo = $(`<div class="mainpage-page-information" style="background-color: ${i.color + '14' || '#fff'}; border-color: ${i.color + 'b1' || '#fff'};">
                    <div class="mainpage-information-wrapper">
                        <div style="display: flex; align-items: center; gap: 1vh;">
                            <i class="fa-solid ${i.icon || 'fa-user'}" style="background-color: ${i.color + '4f' || '#fff'}; color: ${i.color || '#fff'};"></i>
                            <span style="color: ${i.color || '#fff'};">${i.title}</span>
                        </div>
                        <div class="line" style="opacity: 0.5;"></div>
                        <div class="mainpage-page-information-answer" style="color: ${i.color || '#fff'};">${i.description}</div>
                    </div>
                </div>`)

        $('.mainpage-page-informations').append($pageInfo)
    }
})


function ToggleCalculator() {
    const $calculator = $('.calculator-calculator')
    if (!$calculator.is(':visible')) {
        $('.calculator-calculator').html(`<div class="calculator-calculator-nav">
            <span>Kalkulator</span>
            <i class="fa-solid fa-xmark" onclick="ToggleCalculator()"></i>
        </div>
        <input type="text" class="calculator-display">
        <div class="caluclator-buttons">
            <button data-value="AC" class="operratorr">AC</button>
            <button data-value="DEL" class="operratorr">DEL</button>
            <button data-value="%" class="operratorr">%</button>
            <button data-value="/" class="operratorr">/</button>
            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button data-value="*" class="operratorr">*</button>
            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button data-value="-" class="operratorr">-</button>
            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button data-value="+" class="operratorr">+</button>
            <button data-value="0">0</button>
            <button data-value="00">00</button>
            <button data-value=".">.</button>
            <button data-value="=" class="operratorr">=</button>
        </div>`)
        $('.calculator-calculator').show()
    } else {
        $('.calculator-calculator').hide()
    }

    const display = document.querySelector('.calculator-display')
    const buttons = document.querySelectorAll('button')
    const singns = ['%', '*', '/', '-', '+', '=']
    let output = ''

    const calculate = (btnValue) => {
        if (btnValue === '=' && output !== '') {
            output = eval(output.replace('%', '/100'))
        } else if (btnValue === 'AC') {
            output = ''
        } else if (btnValue === 'DEL') {
            output = output.toString().slice(0, -1)
        } else {
            if (output === '' && singns.includes(btnValue)) return

            output += btnValue
        }
        display.value = output
    }

    buttons.forEach((button) => {
        button.addEventListener('click', e => calculate(e.target.dataset.value))
    })
}