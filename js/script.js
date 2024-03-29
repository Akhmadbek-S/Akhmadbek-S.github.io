//(СКРИПТ ДЛЯ СЛИКА)
// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1000,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/PrevArrow.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/NextArrow.png"></button>',
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     arrows: false,
//                     dots: true
//                 }
//             }
//         ]
//     });
// });

//(СКРИПТЫ ДЛЯ СЛАЙДЕРА)
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: 'bottom',
    nav: false,
    responsive: {
        320: {
            nav: true 
        },
        768: {
            nav: false
        }
    }
});
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});


(function($) { //ЗАПУСКАЕТСЯ JQUERY
    //(СКРИПТЫ ДЛЯ ТАБОВ)
    $(function() {
      
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    }
    toggleSlide('.catalog-item__content');
    toggleSlide('.catalog-item__list');
    });

    //СКРИПТЫ ДЛЯ ВЫСКАКИВАНИЯ ФОРМ
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });
    
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #mini').fadeOut();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    //СКРИПТЫ ДЛЯ ВАЛИДАЦИИ ФОРМ
    function valideForm(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format("Необходимо как минимум {0} символа")
                },
                phone: "Введите свой номер телефона",
                email: {
                    required: "Введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    valideForm('#consultation-form');
    valideForm('#consultation form');
    valideForm('#order form');

    //МАСКА ВВОДА НОМЕРА ТЕЛЕФОНА
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //СКРИПТ ОТПРВКИ ПИСЕМ С САЙТА
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");

            $('#consultation, #order').fadeOut();
            $('.overlay, #mini').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //ИКОНКА ВВЕРХ И ПЛАВНЫЙ СКРОЛЛ
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#top']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //АКТИВАЦИЯ WOW.JS
    new WOW().init();
})(jQuery);