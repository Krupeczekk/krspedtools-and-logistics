const selectMenu = document.querySelector('.spedcalc-selectmenu')
const selectButton = document.querySelector('.spedcalc-select-button')
const selectOptions = document.querySelectorAll('.spedcalc-selectmenu-option')
const selectBtnText = document.querySelector('.spedcalc-select-button-text')

selectButton.addEventListener('click', () => selectMenu.classList.toggle('active'))

selectOptions.forEach(option => {
    option.addEventListener('click', () => {
        let selectedOption = option.innerText
        selectBtnText.innerText = selectedOption

        selectMenu.classList.remove('active')
        $('#calculator-calc-type').text(selectedOption)
    })
})

$('#packcalc').on('click', () => {
    $('#packcalc').addClass('selected')
    $('#packscalc').css('display', 'flex')

    $('#drivertimecalc').removeClass('selected')
    $('#barellcalc').removeClass('selected')
    $('#pipecalc').removeClass('selected')

    $('#driverstimecalc').css('display', 'none')
    $('#barellscalc').css('display', 'none')
    $('#pipescalc').css('display', 'none')
})

$('#drivertimecalc').on('click', () => {
    $('#drivertimecalc').addClass('selected')
    $('#driverstimecalc').css('display', 'flex')

    $('#barellcalc').removeClass('selected')
    $('#pipecalc').removeClass('selected')
    $('#packcalc').removeClass('selected')

    $('#packscalc').css('display', 'none')
    $('#barellscalc').css('display', 'none')
    $('#pipescalc').css('display', 'none')
})

$('#barellcalc').on('click', () => {
    $('#barellcalc').addClass('selected')
    $('#barellscalc').css('display', 'flex')

    $('#drivertimecalc').removeClass('selected')
    $('#pipecalc').removeClass('selected')
    $('#packcalc').removeClass('selected')

    $('#packscalc').css('display', 'none')
    $('#driverstimecalc').css('display', 'none')
    $('#pipescalc').css('display', 'none')
})


$('#pipecalc').on('click', () => {
    $('#pipecalc').addClass('selected')
    $('#pipescalc').css('display', 'flex')

    $('#drivertimecalc').removeClass('selected')
    $('#barellcalc').removeClass('selected')
    $('#packcalc').removeClass('selected')

    $('#packscalc').css('display', 'none')
    $('#driverstimecalc').css('display', 'none')
    $('#barellscalc').css('display', 'none')
})

$(document).ready(function () {
    $('.drivetimerTable tbody').empty()

    $('#calculate-packs').on('click', () => {
        let pjllength = parseInt($('#packs-pjl-length').val()) // przestrzeń ładunkowa
        let pjlwidth = parseInt($('#packs-pjl-width').val())
        let pjlheight = parseInt($('#packs-pjl-height').val())

        let paletelength = parseInt($('#packs-palete-length').val()) // paleta
        let paletewidth = parseInt($('#packs-palete-width').val())
        let paleteheight = parseInt($('#packs-palete-height').val())
        let paleteweight = parseInt($('#packs-palete-weight').val())
        let maxpaletelayers = parseInt($('#packs-max-palete-layers').val())
        let paleteClearance = parseInt($('#packs-palete-manipulation-clearance').val()) || 0

        let packlength = parseInt($('#packs-pack-length').val()) // paczka
        let packwidth = parseInt($('#packs-pack-width').val())
        let packheight = parseInt($('#packs-pack-height').val())
        let packweight = parseInt($('#packs-pack-weight').val())

        const showOrBrak = (val, fixed = null, suffix = '') => {
            if (typeof val === 'number' && !isNaN(val)) {
                return fixed !== null ? val.toFixed(fixed) + suffix : val + suffix
            }
            return 'Brak'
        }

        // luz manipulacyjny
        let innerLength = Math.max(0, paletelength + 2 * paleteClearance)
        let innerWidth = Math.max(0, paletewidth + 2 * paleteClearance)

        let w1 = Math.floor(innerLength / packlength)
        let h1 = Math.floor(innerWidth / packwidth)
        let w2 = Math.floor(innerLength / packwidth)
        let h2 = Math.floor(innerWidth / packlength)

        let variant1 = w1 * h1
        let variant2 = w2 * h2

        let rawLayers = (pjlheight && paleteheight && packheight) ? Math.floor((pjlheight - paleteheight) / packheight) : NaN
        let maxLayers = isNaN(maxpaletelayers) ? rawLayers : Math.min(rawLayers, maxpaletelayers)

        let totalPacks1 = variant1 * maxLayers
        let totalPacks2 = variant2 * maxLayers

        let weightNoPalette1 = totalPacks1 * packweight
        let weightNoPalette2 = totalPacks2 * packweight

        let totalWeight1 = weightNoPalette1 + paleteweight
        let totalWeight2 = weightNoPalette2 + paleteweight

        let palletHeightTotal = paleteheight + (maxLayers * packheight)
        let volumePJL1 = (paletelength * paletewidth * palletHeightTotal) / 1_000_000_000
        let volumePJL2 = volumePJL1

        let p1 = Math.floor(pjllength / paletelength)
        let p2 = Math.floor(pjlwidth / paletewidth)
        let p3 = Math.floor(pjllength / paletewidth)
        let p4 = Math.floor(pjlwidth / paletelength)

        let variant3 = p1 * p2
        let variant4 = p3 * p4

        let paletePerLayout1 = Math.max(variant3, variant4)
        let paletePerLayout2 = paletePerLayout1

        let paleteLayers = Math.floor(pjlheight / palletHeightTotal)
        let totalPaletes = paletePerLayout1 * paleteLayers

        let allLoadWeight1 = totalPaletes * totalWeight1
        let allLoadWeight2 = totalPaletes * totalWeight2

        let loadTotalVolume1 = volumePJL1 * totalPaletes
        let loadTotalVolume2 = volumePJL2 * totalPaletes

        let cargoVolume = (pjllength * pjlwidth * pjlheight) / 1_000_000_000

        let fillPercentage1 = (loadTotalVolume1 / cargoVolume) * 100
        let fillPercentage2 = (loadTotalVolume2 / cargoVolume) * 100

        let totalPacksInLoad1 = totalPacks1 * totalPaletes
        let totalPacksInLoad2 = totalPacks2 * totalPaletes

        function setResult(id, val) {
            $(`#packs-results-${id}-1`).text(val[0])
            $(`#packs-results-${id}-2`).text(val[1])
        }

        setResult('layer-packages', [showOrBrak(variant1), showOrBrak(variant2)])
        setResult('layers-on-pallet', [showOrBrak(maxLayers), showOrBrak(maxLayers)])
        setResult('total-packages', [showOrBrak(totalPacks1), showOrBrak(totalPacks2)])
        setResult('weight-no-pallet', [showOrBrak(weightNoPalette1, 2, ' KG'), showOrBrak(weightNoPalette2, 2, ' KG')])
        setResult('total-weight-pallet', [showOrBrak(totalWeight1, 2, ' KG'), showOrBrak(totalWeight2, 2, ' KG')])
        setResult('pallet-volume', [showOrBrak(volumePJL1, 3), showOrBrak(volumePJL2, 3)])
        setResult('pallets-per-layer-cargo', [showOrBrak(paletePerLayout1), showOrBrak(paletePerLayout2)])
        setResult('pallet-layers-cargo', [showOrBrak(paleteLayers), showOrBrak(paleteLayers)])
        setResult('total-pallets-cargo', [showOrBrak(totalPaletes), showOrBrak(totalPaletes)])
        setResult('total-cargo-weight', [showOrBrak(allLoadWeight1, 2, ' KG'), showOrBrak(allLoadWeight2, 2, ' KG')])
        setResult('total-cargo-volume', [showOrBrak(loadTotalVolume1, 3), showOrBrak(loadTotalVolume2, 3)])
        setResult('utilization-rate', [showOrBrak(fillPercentage1, 2, ' %'), showOrBrak(fillPercentage2, 2, ' %')])
        setResult('total-packs', [showOrBrak(totalPacksInLoad1), showOrBrak(totalPacksInLoad2)])
    })


    $('#policz-beczki').on('click', () => {
        let bpjllengthRaw = parseInt($('#barells-pjl-length').val())
        let bpjlwidthRaw = parseInt($('#barells-pjl-width').val())
        let bpjlheight = parseInt($('#barells-pjl-height').val())

        let bpjllength = bpjllengthRaw
        let bpjlwidth = bpjlwidthRaw

        let bpaletelengthRaw = parseInt($('#barells-palete-length').val())
        let bpaletewidthRaw = parseInt($('#barells-palete-width').val())
        let bpaleteheight = parseInt($('#barells-palete-height').val())
        let bpaleteweight = parseInt($('#barells-palete-weight').val())
        let bmaxpaletelayers = parseInt($('#barells-max-palete-layers').val())
        let bpaleteClearance = parseInt($('#barells-palete-manipulation-clearance').val()) || 0

        let bpaletelength = bpaletelengthRaw + (bpaleteClearance * 2)
        let bpaletewidth = bpaletewidthRaw + (bpaleteClearance * 2)

        let barelldiametr = parseInt($('#barells-barell-diametr').val())
        let barellheight = parseInt($('#barells-barell-height').val())
        let barellweight = parseInt($('#barells-barell-weight').val())
        let zabezpieczeniasrednica = parseInt($('#barells-barell-safety-diametr').val()) || 0

        let adjBarellDimens = barelldiametr + (2 * zabezpieczeniasrednica)

        const showOrBrak = (val, fixed = null, suffix = '') => {
            if (typeof val === 'number' && !isNaN(val)) {
                if (fixed !== null && typeof val.toFixed === 'function') {
                    return val.toFixed(fixed) + suffix
                }
                return val + suffix
            }
            return 'Brak'
        }

        let width1 = Math.floor(bpaletelength / adjBarellDimens)
        let height1 = Math.floor(bpaletewidth / adjBarellDimens)
        let variant = width1 * height1

        let rawLayers = (bpjlheight && bpaleteheight && barellheight) ? Math.floor((bpjlheight - bpaleteheight) / barellheight) : NaN
        let maxLayers = isNaN(bmaxpaletelayers) ? rawLayers : Math.min(rawLayers, bmaxpaletelayers)

        let totalBarells = variant * maxLayers
        let weightNoPalette = totalBarells * barellweight
        let totalWeight = weightNoPalette + bpaleteweight
        let bpalletHeightTotal = bpaleteheight + (maxLayers * barellheight)
        let volumePJL = (bpaletelengthRaw * bpaletewidthRaw * bpalletHeightTotal) / 1_000_000_000

        let p1 = Math.floor(bpjllength / bpaletelengthRaw)
        let p2 = Math.floor(bpjlwidth / bpaletewidthRaw)
        let p3 = Math.floor(bpjllength / bpaletewidthRaw)
        let p4 = Math.floor(bpjlwidth / bpaletelengthRaw)

        let palVariant1 = p1 * p2
        let palVariant2 = p3 * p4
        let paletePerLayout = Math.max(palVariant1, palVariant2)
        let paleteLayers = Math.floor(bpjlheight / bpalletHeightTotal)
        let totalPaletes = paletePerLayout * paleteLayers
        let allLoadWeight = totalPaletes * totalWeight
        let loadTotalVolume = volumePJL * totalPaletes
        let cargoVolume = (bpjllengthRaw * bpjlwidthRaw * bpjlheight) / 1_000_000_000
        let fillProcent = (loadTotalVolume / cargoVolume) * 100
        let totalBarellsInLoad = totalBarells * totalPaletes

        function updateCell(id, val) {
            $(id).text(val)
        }

        updateCell('#barells-results-layer-packages-1', showOrBrak(variant))
        updateCell('#barells-results-layers-on-palete', showOrBrak(maxLayers))
        updateCell('#barells-results-total-on-palete', showOrBrak(totalBarells))
        updateCell('#barells-results-pjl-weight-nopalete', showOrBrak(weightNoPalette, 2, ' KG'))
        updateCell('#barells-results-pjl-weight-total', showOrBrak(totalWeight, 2, ' KG'))
        updateCell('#barells-results-pjl-volume', showOrBrak(volumePJL, 3))
        updateCell('#barells-results-paletes-in-layer', showOrBrak(paletePerLayout))
        updateCell('#barells-results-paletes-layers', showOrBrak(paleteLayers))
        updateCell('#barells-results-paletes-total', showOrBrak(totalPaletes))
        updateCell('#barells-results-load-weight', showOrBrak(allLoadWeight, 2, ' KG'))
        updateCell('#barells-results-load-volume', showOrBrak(loadTotalVolume, 3))
        updateCell('#barells-results-load-fill', showOrBrak(fillProcent, 2, ' %'))
        updateCell('#barells-results-total-barells', showOrBrak(totalBarellsInLoad))
    })


    $('#policz-rury').on('click', () => {
        // p. ład
        let pjlLength = parseInt($('#pipes-pjl-length').val())
        let pjlWidth = parseInt($('#pipes-pjl-width').val())
        let pjlHeight = parseInt($('#pipes-pjl-height').val())

        // paleta
        let palLength = parseInt($('#pipes-palete-length').val())
        let palWidth = parseInt($('#pipes-palete-width').val())
        let palHeight = parseInt($('#pipes-palete-height').val())
        let palWeight = parseInt($('#pipes-palete-weight').val())
        let maxPalLayers = parseInt($('#pipes-max-palete-layers').val())
        let palClearance = parseInt($('#pipes-palete-manipulation-clearance').val()) || 0

        // rury
        let pipeDiam = parseInt($('#pipes-pipe-diametr').val())
        let pipeHeight = parseInt($('#pipes-pipe-height').val())
        let pipeWeight = parseInt($('#pipes-pipe-weight').val())

        // kołnierz rury
        let collarDiam = parseInt($('#pipes-pipe-collar-diametr').val())
        let collarLen = parseInt($('#pipes-pipe-collar-length').val())

        const showOrBrak = (val, fixed = null, suffix = '') => {
            if (typeof val === 'number' && !isNaN(val)) {
                if (fixed !== null && typeof val.toFixed === 'function') {
                    return val.toFixed(fixed) + suffix
                }
                return val + suffix
            }
            return 'Brak'
        }

        // calc kołnierza
        let pipeFullLength = (!isNaN(collarLen) && collarLen > 0) ? pipeHeight + collarLen : pipeHeight
        let pipeFullDiameter = (!isNaN(collarDiam) && collarDiam > 0) ? pipeDiam + 2 * collarDiam : pipeDiam

        // rury na palecie + luz
        let usablePalLength = palLength + (palClearance * 2)
        let usablePalWidth = palWidth + (palClearance * 2)
        let pipesPerRow = Math.floor(usablePalLength / pipeFullDiameter)
        let pipesPerColumn = Math.floor(usablePalWidth / pipeFullDiameter)
        let pipesPerLayer = pipesPerRow * pipesPerColumn

        // warstw rur na palecie
        let usablePjlHeight = pjlHeight - palHeight
        let rawLayers = Math.floor((usablePjlHeight) / pipeFullLength)
        let pipeLayers = isNaN(maxPalLayers) ? rawLayers : Math.min(rawLayers, maxPalLayers)

        // total rury na palecie
        let totalPipes = pipesPerLayer * pipeLayers

        // masa bez palety
        let weightNoPalette = totalPipes * pipeWeight

        // masa + paleta
        let totalWeight = weightNoPalette + palWeight

        // obj pjł
        let totalPalletHeight = palHeight + (pipeLayers * pipeFullLength)
        let volumeSinglePJL = (palLength * palWidth * totalPalletHeight) / 1_000_000_000

        let usableCargoLength = pjlLength
        let usableCargoWidth = pjlWidth

        let p1 = Math.floor(usableCargoLength / palLength)
        let p2 = Math.floor(usableCargoWidth / palWidth)
        let p3 = Math.floor(usableCargoLength / palWidth)
        let p4 = Math.floor(usableCargoWidth / palLength)

        let layout1 = p1 * p2
        let layout2 = p3 * p4
        let paletesPerLayer = Math.max(layout1, layout2)

        // palety w 1 warstwie w przestrzeni ład.
        let paleteLayers = Math.floor(pjlHeight / totalPalletHeight)

        // total palety w p. ład
        let totalPaletes = paletesPerLayer * paleteLayers

        // total masa ładuynku
        let totalLoadWeight = totalPaletes * totalWeight

        // total obj. ładunku
        let totalLoadVolume = totalPaletes * volumeSinglePJL

        // obj. przestrzeniu ład
        let cargoVolume = (pjlLength * pjlWidth * pjlHeight) / 1_000_000_000

        // % wypełnienia
        let fillPercent = (totalLoadVolume / cargoVolume) * 100

        // total rur na całym ładunku
        let totalPipesInLoad = totalPipes * totalPaletes

        $('#pipes-results-layer-packages').text(showOrBrak(pipesPerLayer))
        $('#pipes-results-weight-no-palette').text(showOrBrak(weightNoPalette, 2, ' KG'))
        $('#pipes-results-total-weight').text(showOrBrak(totalWeight, 2, ' KG'))
        $('#pipes-results-volume-single').text(showOrBrak(volumeSinglePJL, 3))
        $('#pipes-results-paletes-per-layer').text(showOrBrak(paletesPerLayer))
        $('#pipes-results-palete-layers').text(showOrBrak(paleteLayers))
        $('#pipes-results-total-paletes').text(showOrBrak(totalPaletes))
        $('#pipes-results-load-weight').text(showOrBrak(totalLoadWeight, 2, ' KG'))
        $('#pipes-results-load-volume').text(showOrBrak(totalLoadVolume, 3))
        $('#pipes-results-fill-percent').text(showOrBrak(fillPercent, 2, ' %'))
        $('#pipes-results-total-pipes').text(showOrBrak(totalPipesInLoad))
    })


    $('#calculate-drivertime').on('click', () => {
        let distnace = parseFloat($('#drivertime-distance').val()) || 0
        let speed = parseFloat($('#drivertime-speed').val()) || 0
        let startDate = $('#drivertime-start-date').val()

        if (!distnace || !speed || !startDate) return

        let loadTime = parseFloat($('#drivertime-loadtime').val()) || 0
        let unloadTime = parseFloat($('#drivertime-unloadtime').val()) || 0
        let longDrive = $('#drivertime-is-longdrive').is(':checked')
        let shortSleep = $('#drivertime-is-shortsleep').is(':checked')
        let isLoading = $('#drivertime-is-loading-and-unloading').is(':checked')

        let MaxDailyDrive = longDrive ? 10 * 60 : 9 * 60
        let MaxSessionDrive = 4 * 60 + 30
        let BreakTime = 45
        let RestTime = shortSleep ? 9 * 60 : 11 * 60
        let TotalDriveTime = (distnace / speed) * 60

        let currentTime = new Date(startDate)
        let remainingDrive = TotalDriveTime
        let remainingDailyDrive = MaxDailyDrive

        const tbody = $('.drivetimerTable tbody')
        tbody.empty()

        const formatTime = (d) => d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
        const formatDate = (d) => d.toLocaleDateString('pl-PL')

        const durationText = (from, to) => {
            let diff = (to - from) / 60000 // w minutach
            let h = Math.floor(diff / 60)
            let m = Math.floor(diff % 60)
            if (h > 0 && m > 0) return `${h}h ${m}min`
            if (h > 0) return `${h}h 0min`
            return `${m}min`
        }

        const addTable = (from, to, label, drived, remaining) => {
            tbody.append(`
            <tr class="drivertime-data">
                <td>${formatDate(from)}</td>
                <td>${formatTime(from)} - ${formatTime(to)}</td>
                <td>${label}</td>
                <td>${drived} km</td>
                <td>${remaining} km</td>
                <td>${durationText(from, to)}</td>
            </tr>
        `)
        }

        if (isLoading && loadTime > 0) {
            const end = new Date(currentTime.getTime() + loadTime * 60000)
            addTable(currentTime, end, 'Załadunek', '0.0', distnace.toFixed(1))
            currentTime = end
        }

        while (remainingDrive > 0) {
            if (remainingDailyDrive <= 0) {
                const restEnd = new Date(currentTime.getTime() + RestTime * 60000)
                addTable(currentTime, restEnd, 'Odpoczynek', '0.0', ((remainingDrive / 60) * speed).toFixed(1))
                currentTime = restEnd
                remainingDailyDrive = MaxDailyDrive
                continue
            }

            const sessionTime = Math.min(MaxSessionDrive, remainingDrive, remainingDailyDrive)
            const drivedDistance = (sessionTime / 60) * speed
            const sessionEnd = new Date(currentTime.getTime() + sessionTime * 60000)

            addTable(currentTime, sessionEnd, 'Jazda', drivedDistance.toFixed(1), ((remainingDrive - sessionTime) / 60 * speed).toFixed(1))

            currentTime = sessionEnd
            remainingDrive -= sessionTime
            remainingDailyDrive -= sessionTime

            if (remainingDrive > 0 && remainingDailyDrive > 0) {
                const breakEnd = new Date(currentTime.getTime() + BreakTime * 60000)
                addTable(currentTime, breakEnd, 'Przerwa', '0.0', ((remainingDrive / 60) * speed).toFixed(1))
                currentTime = breakEnd
            }
        }

        if (isLoading && unloadTime > 0) {
            const end = new Date(currentTime.getTime() + unloadTime * 60000)
            addTable(currentTime, end, 'Rozładunek', '0.0', '0.0')
        }
    })

    const isLoadingCheckbox = document.getElementById('drivertime-is-loading-and-unloading')

    isLoadingCheckbox.addEventListener('change', () => {
        const panel = document.getElementById('drivertime-loadandunloading')
        if (isLoadingCheckbox.checked) {
            panel.style.display = 'flex'
            requestAnimationFrame(() => {
                panel.classList.add('warn-window')
            })
            setTimeout(() => {
                panel.classList.remove('warn-window')
            }, 1500)
        } else {
            panel.style.display = 'none'
        }
    })
})