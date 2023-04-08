// console.log(
//   'Оценка за задание: 100/100 баллов\n\nТребования к вёрстке\n\nВёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n\nнет полосы прокрутки при ширине страницы Main от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Main от 768рх до 320рх: +5\nнет полосы прокрутки при ширине страницы Pets от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Pets от 768рх до 320рх: +5\nВерстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n\nна странице Main: +4\nна странице Pets: +4\nПри ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\nВерстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8\n',
// );

export const crossCheck = () =>
  console.log(
    'Оценка за задание: 110/110 баллов\n\nТребования к функционалу\n\nРеализация burger menu на обеих страницах: +26\nпри ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2\nпри нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4\nвысота адаптивного меню занимает всю высоту экрана: +2\nпри повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно: +4\nбургер-иконка создана при помощи html+css, без использования изображений: +2\nссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню: +2\nпри клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2\nрасположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонталиэлементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая: +2\nобласть, свободная от бургер-меню, затемняется: +2\nстраница под бургер-меню не прокручивается: +4\nРеализация слайдера-карусели на странице Main: +36\nпри нажатии на стрелки происходит переход к новому блоку элементов: +4\nсмена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется): +4\nслайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек: +4\nпри переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4\nкаждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:\nв текущем блоке слайда карточки с питомцами не повторяются: +4\nв следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде: +4\nсохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного: +4\nпри каждой перезагрузке страницы формируется новая последовательность карточек: +2\nгенерация наборов карточек происходит на основе 8 объектов с данными о животными: +2\nпри изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы (набор карточек при этом может как изменяться, так и оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования): +4\nРеализация пагинации на странице Pets: +36\n\nпри перезагрузке страницы всегда открывается первая страница пагинации: +2\nпри нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2\nпри нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2при открытии первой страницы кнопки << и < неактивны: +2\nпри открытии последней страницы кнопки > и >> неактивны: +2\nв кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2\nкаждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:\n\nпри загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4\nпри каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4\nкарточки питомцев не должны повторяться на одной странице: +4\nпри переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4\nпри неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2\nобщее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2\nпри изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +4\nРеализация попап на обеих страницах: +12\nпопап появляется при нажатии на любое место карточки с описанием конкретного животного: +2\nчасть страницы вне попапа затемняется: +2\nпри открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2\nпри нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит: +2\nкнопка с крестиком интерактивная: +2\nокно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2\n',
  );
