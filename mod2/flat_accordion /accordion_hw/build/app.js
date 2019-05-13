$('.layout')
    .on('click', '._section', function(){
        if($(this).find('.section_text').hasClass('_hidden')){
            $(this).find('.section_text').slideDown(400).toggleClass('_hidden')
            return;
        }else $(this).find('.section_text').toggleClass('_hidden' ).slideUp(400)
        })
