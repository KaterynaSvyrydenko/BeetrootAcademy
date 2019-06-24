/*$('.container').on('click', '#add', function(){
    const CLONE = $('#templateLi').contents().clone()
    $('#incomplete-tasks').append(CLONE.find('label').text($('#new-task').val()).parent())
});*/
const $INCOMPLETE = $('#incomplete-tasks')
$('.container')
    .on('click', '#add', add)
    .on('keypress', '#new-task', onKeyPress)

   .on('click', 'input[type="checkbox"]', function(){
        const $LI = $(this).closest('li');
        if (this.checked){
            $LI.appendTo('#completed-tasks');
            return;
        }
        $INCOMPLETE.append($LI);
   })
    .on('click', '.edit', edit)
    .on('keypress', 'li input[type="text"]', onKeyPress)
    .on('click', '.delete', function(){
        const $LI = $(this).closest('li');
        $LI.remove();
   });

    function onKeyPress(event){
        if(event.keyCode !== 13){
            return;
        }
        if(this.id == 'new-task'){
            add();
            return;
        }
        edit();
    }

    function add() {
        $INCOMPLETE.append(
            $('#templateLi')
                .contents()
                .clone()
                .find('label')
                .text($('#new-task').val())
                .parent()
            );
            $('#new-task').val('');
   }

    function edit(){
        const $LI = $(this).closest('li');
        $LI.toggleClass('editMode');
        if ($LI.hasClass('editMode')){
            $LI.find('input[type="text"]').val($LI.find('label').text());
            return
        }
        $LI.find('label').text($LI.find('input[type="text"]').val());
   }



