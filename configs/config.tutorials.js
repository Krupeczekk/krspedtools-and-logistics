const Tutorials = [
    {
        title: 'Liczenie jednej warstwy paczek na palecie',
        instructions: [
            {
                label: 'Zebranie danych',
                description: 'Zbierz wszystkie wymiary, które są wymagane do wykonania obliczeń: <p> - Wymiary paczki (Na przykład 250 x 300 x 210 [mm])</p> <p> - Wymiary palety (Na przykład 1200 x 800 x 144 [mm])</p>'
            },
            {
                label: 'Obliczanie pierwszym sposobem',
                description: 'Dzielimy wymiary palety przez wymiary paczki. Długość przez długość, szerokość przez szerokość. <p>1200:250 = 4.8 ~ 4(Zaokrąglamy do 4)</p> <p>800:300 = 2.66 ~ 2 (Zaokrąglamy do 2)</p> <p>Mnożymy wyniki przez siebie.</p> <p>4 * 2 = 8</p>',
            },
            {
                label: 'Obliczanie drugim sposobem',
                description: 'Robimy to samo co wcześniej, tylko tym razem długość przez szerokość, szerokość przez długość. <p>1200:300 = 4</p> <p>800:250 = 3.2 ~ 3 (Zaokrąglamy do 3)</p> <p>Mnożymy wyniki przez siebie.</p> <p>4*3 = 12</p>',
            },
            {
                label: 'Wybór większego wyniku',
                description: 'Wynik pierwszego mnożenia: 8 <p> Wynik drugiego mnożenia: 12</p> <p>Wybieramy 12, ponieważ wynik jest większy - więcej paczek się zmieści na palecie.</p>'
            }
        ]
    },
    {
        title: 'Liczenie kilku warstw paczek na palecie',
        instructions: [
            {
                label: 'Zebranie danych',
                description: 'Zbierz wszystkie wymiary, które są wymagane do wykonania obliczeń: <p> - Wymiary paczki (Na przykład 190 x 270 x 230 [mm])</p> <p> - Wymiary palety (Na przykład 1200 x 800 x 144 [mm])</p> <p> - Maksymalna wysokość PJŁ (Na przykład 1500 [mm])</p>'
            },
            {
                label: 'Obliczanie jednej warstwy pierwszym sposobem',
                description: 'Dzielimy wymiary palety przez wymiary paczki. Tak samo jak wcześniej. <p>Wynik: 12</p>',
            },
            {
                label: 'Obliczanie jednej warstwy drugim sposobem',
                description: 'Dzielimy wymiary palety przez wymiary paczki. Tak samo jak wcześniej. <p>Wynik: 16</p>',
            },
            {
                label: 'Wybór',
                description: 'Wybieramy drugi sposób (16) - Jest większy.',
            },
            {
                label: 'Obliczanie ilości warstw',
                description: 'Na początku odejmujemy wysokość palety od <strong>podanej maksymalnej wysokości PJŁ</strong> <p>1500 - 144 = 1356</p> Teraz wynik dzielimy przez wysokość jednej paczki. <p>1356:230 = 5,89 (Zaokrąglamy do 5).</p>',
            },
            {
                label: 'Wynik końcowy',
                description: 'Mamy 5 warstw paczek na palecie. Teraz możemy wymnożyć <strong>ilość paczek w jednej warstwie</strong> przez <strong>ilość warstw.</strong> <p>16 * 5 = 80</p> <p>Na palecie zmieściło się nam <strong>80</strong> paczek.</p>',
            },
        ]
    },
    {
        title: 'Obliczanie wagi jednej PJŁ',
        instructions: [
            {
                label: 'Zebranie danych',
                description: 'Załóżmy, że w jednej warstwie znajduje się 12 paczek, a warstw paczek mamy 5. Jedna paczka waży 4 [kg], natomiast paleta waży 25 [kg].'
            },
            {
                label: 'Obliczenia',
                description: 'Mnożymy <strong>ilość paczek w jednej warstwie</strong> przez <strong>ilość warstw.</strong> <p>12 * 5 = 60</p>'
            },
            {
                label: 'Obliczenie wagi',
                description: 'Gdy mamy już wynik mnożenia, to wystarczy teraz pomnożyć ten wynik przez wagę jednej paczki. <p>60 * 4 = 240</p>'
            },
            {
                label: 'Wynik końcowy',
                description: 'Wszystkie paczki ważą razem 240 [kg]. Do tego wyniku możemy dodać wagę palety. <p>240 + 25 = 265</p> <p>Waga jednej PJŁ wynosi 265 [kg].</p>'
            },
        ]
    },
]