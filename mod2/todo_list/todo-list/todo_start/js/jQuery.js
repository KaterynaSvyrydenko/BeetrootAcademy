$(function() {
    $('#add').click(function(){
        var newLi = $('li.template').first();
        var cloneLi = newLi.clone();
            var text = $('#new-task').val();
            cloneLi.children('label').text(text);
        $('#incomplete-tasks').append(cloneLi);
    })
    $('.container').on('click', '.delete', '.edit', function(evt){
        var target = evt.target,
            targetLi = target.closest('li');
        $(targetLi).remove();
    })
    $('.container').on('click', '.edit', function(evt){
        var targetLi = evt.target.closest('li');
        $(targetLi).toggleClass('editMode');
            var input = $(targetLi).children('li input[type="text"]').val();
            $(targetLi).children('label').text(input);
    })
})
