$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/Clock/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/Clock/right.png"></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
          }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    
    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');
    
    $('[data-modaal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modaal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modaal__descr').text($('.catalog-item__subtitle').eq(i).text())
        })
    });

  function validaForms(form) {
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
          required: "Пожалуйста ведите своё имя",
          minlength: jQuery.validator.format("Минимум {0} слова")
        },
        phone: "Пожалуйста ведите свой номер телефона",
        email: {
          required: "Пожалуйста ведите свой почту",
          email: "Неправилньо введен адрес почты"
        }
      }
    });
  }
  
  validaForms('#consultation-form');
  validaForms('#consultation form');
  validaForms('#order form');

  $('input[name=phone]').mask("+38 (999) 999-99-99");

  $(window).scroll(function() {
      if($(this).scrollTop() > 1600 ) {
        $('.pageup').fadeIn();
      }else {
        $('.pageup').fadeOut();
      }
  });

  $("a[href='#up']").click(function(){
      var _href = $(this).attr("href");
      $("hrml, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });

  $('form').submit(function(e) {
      e.preventDefault();

      if(!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val('');
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
      });
      return false;
  });  
});