var time;


$(document).ready(function () {
  $('#btnDescarga, #btnDescarga2').click(function(){
    swal({
      title: "Lo sentimos",
      text: "La app aún no esta disponible para su descarga. Lanzamiento previsto para principios del 2018",
      icon: "info",
      button: "Aceptar",
    });

  });
 
    
 
  var wWidth = $(window).outerWidth();
  var mobile = wWidth < 600 ? true : false;

  if (mobile == false) {
    $('#first_video').bind('ended', function () {
      $('#first_video').fadeOut();
      $('#first_video').remove();
      $('#botonera').removeClass('hidden');
      $('#video_loop').removeClass('hidden');
      $('#video_loop').fadeIn();
      $('#video_loop')[0].play();

    });
  } else {
    $('#first_video').remove();
    $('#botonera').removeClass('hidden');
    $('#video_loop').removeClass('hidden');
    $('#video_loop')[0].play();
  }

  //Handler de menu
  $('nav#menu li.menuitem, #header.root .logo').click(function (e) {
    e.preventDefault();
    var body = $("html, body");
    var menuitem = $(e.currentTarget);
    var section = $(this).data('section');
    var pos = $('#' + section).offset().top;
    body.stop().animate({
      scrollTop: pos
    }, '500', 'swing', function () {
      document.location.href = document.location.origin + document.location.pathname + '#' + section;
      body.stop().animate({
        scrollTop: pos - $('#header.root').outerHeight() + 20
      }, '500', 'swing');
    });

    $('.menuitem').removeClass('selected');
    menuitem.addClass('selected');

    if (mobile) {
      $('nav#menu .menuitem').animate({
        'height': '0px'
      }, 100);
      $('#header').animate({
        'padding-bottom': '0px'
      }, 100);
      menuOpened = !menuOpened;
    }



  });

  var menuOpened = false;
  $('.menuButton').click(function (event) {

    if (menuOpened == false) {
      $('#logo').css({
        'margin-top': '-50px'
      });
      $('nav#menu .menuitem').animate({
        'height': '48px'
      }, 100);
      $('#header').animate({
        'padding-bottom': '194px'
      }, 100);
      $('#menu').animate({
        'top': '50px',
        'margin-left': '0px'
      }, 100);
      menuOpened = true;
    } else {
      $('#logo').css({
        'margin-top': ''
      });
      $('nav#menu .menuitem').animate({
        'height': '0px'
      }, 100);
      $('#header').animate({
        'padding-bottom': ''
      }, 100);

      menuOpened = false;

    }

  });




  //Seteo de vision de ciudad
  var maxHeight = 250;
  /* $('#visionciudad .list-container').each(function() {
     if ($(this).height() > maxHeight) {
       maxHeight = $(this).height();
     }
   });*/
  $('#visionciudad .list-container').height(maxHeight);

  //Seteo de equipo
  shuffle(organizers).forEach(function (org) {
    $('#equipoContenedor').append(
      $('<div class="columna tercio pad20">' +
        '<div class="list-item horizontal-center height-limit vertical-center font-color-white" data-comision="' + org.name + '" style="border-color:' + org.color + '">' +
        '<div>' +
        '<div class="h2 bold all-caps">' + org.displayName + '</div>' +
        '<separador class="diez"></separador>' +
        '<div class="h4">' + org.description + '</div>' +
        '</div>' +
        '</div>' +
        '</div>')
    );
  });

  //Seteo de calendario
  moment.locale("es");
  $('#calendar').fullCalendar(calendarOptions);
  setTimeout(function () {
    if (mobile) {
      $('.meetup').remove();
      $('#calendar').fullCalendar('changeView', 'listMonth');
    }
  }, 1000);

  //Seteo de evento de scroll
  time = setInterval(bounceVisionCiudad, 4000);
  CheckScroll();
  $(document).scroll(function (e) {
    CheckScroll();
    var x = $(window).scrollTop();
    //$('.parallax-bk').css('background-position', 'center ' + (-($(window).outerHeight()/2.2) + parseInt(x / 6)) + 'px')
  });

  //Seteo de evento de resize
  ResizeBoxes();
  $(window).on('resize', function (event) {
    ResizeBoxes();
  });

  //Seteo de fondos de contenedores



  function ResizeBoxes() {
    $('.half-height').each(function () {
      $(this).css('height', ($(this).width() / 3 * 2) + 'px');
    });
  }

  function CheckScroll() {
    if ($(window).scrollTop() >= $()) {
      clearInterval(time);
    } else {
      time = setInterval(bounceVisionCiudad, 4000);

      if ($(window).scrollTop() >= $(window).outerHeight() / 10 * 9) {
        $('#header.root').addClass('position-fixed');
        $('#header.root nav#menu .button').removeClass('no-width');
        if ($('#portada').hasClass('height-almost-full'))
          $('#portada').removeClass('height-almost-full').addClass('height-full');
      } else {
        $('#header.root').removeClass('position-fixed');
        $('#header.root nav#menu .button').addClass('no-width');
        if ($('#portada').hasClass('height-full'))
          $('#portada').addClass('height-almost-full').removeClass('height-full');
      }
    }
  }


  function bounceVisionCiudad() {
    // var delay = 0;
    // $('#visionciudad .columna').each(function(index, el) {
    //   setTimeout(function() {
    //     $(el).animate({
    //       'margin-top': '-300px'
    //     }, '500ms', function() {
    //       $(el).animate({
    //         'margin-top': '0'
    //       }, '500ms')
    //     });
    //   }, delay);
    //   delay += 1000;
    // });
  }

});