$(function () {
    $('.spedlog-items-categories').html(``)

    for (let i of SpedLog) {
        const $category = $(`<div class="spedlog-items-category">
                <div class="spedlog-items-category-title">${i.categoryName}</div>
                <div class="spedlog-items-list"></div>
            </div>`)
        
        const $itemsList = $category.find('.spedlog-items-list')

        for (let itemData of i.categoryItems) {
            let DescHtml = '';
            for (let desc of itemData.itemsDescs) {
                DescHtml += `
                    <div class="spedlog-items-item-description">
                        <div class="spedlog-item-desc-title">${desc.label}</div>
                        <div class="spedlog-item-desc-description">${desc.desc}</div>
                    </div>
                    <div class="line"></div>`;
            }

            const $item = $(`
                <div class="spedlog-items-item">
                    <div style="display: flex; gap: 2vh; width: 100%; height: 20vh">
                        <img src="images/spedlog-images/${itemData.imageName}.png" alt="">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 1vh;">
                            <div class="spedlog-items-item-title">${itemData.itemName}</div>
                            <div class="line"></div>
                            <div class="spedlog-item-description">${itemData.itemDescription}</div>
                        </div>
                    </div>
                    <div class="spedlog-items-item-descriptions-description" style="display: none;">
                        <div class="spedlog-items-item-descriptions-description-title">Opis</div>
                        <div class="line"></div>
                        ${DescHtml}
                    </div>
                    <div class="spedlog-button">Pokaż więcej</div>
                </div>
            `);

            $item.find('.spedlog-button').on('click', function() {
                const $btn = $(this)
                const $desc = $btn.siblings('.spedlog-items-item-descriptions-description')
                $desc.slideToggle(500, function () {
                    const isVisible = $(this).is(':visible')
                    $btn.text(isVisible ? 'Pokaż mniej' : 'Pokaż więcej')
                })
            })
            $itemsList.append($item);
        }
        $('.spedlog-items-categories').append($category)
    }
})