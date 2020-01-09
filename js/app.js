$(document).ready(function () {

    $('.box').append('<input type="text" class="s1" maxlength="1" >');
    $('.box2').append('<input type="text" class="s1" maxlength="1" >');
    $('.box3').append('<input type="text" class="s1" maxlength="1" >');

    $('#reset_button').on('click',function(){
        $('input.s1').val('');
    });

    $('#files').on('change', function(){
        if ($(this).val() != "") {
            load_data($(this).val());
            $('#filename').html($(this).val());
        }
    });

    $('#save_button').on('click', function(){
        if ($('#filename').text() != 'untitled') {
            save_data($('#filename').text(), get_data());
        } else {
            $('#save_as_button').click();
        }
    });

    $('#save_as_button').on('click', function(){
        filename = prompt("Enter file name");

        if (validate_filename(filename)){
            if (!save_new(filename)) {
                alert('File name already exists. Pick a different file name.');
            } else {
                $('#filename').html(filename);
            }
        } else {
            alert('Invalid filename');
        }
    });

    $('#new_button').on('click', function(){
        $('#filename').html('untitled');
        $('input.s1').val('');
        $('#files').val('');
    });

    load_file_select();

    $('body').on('keyup', 'input.s1', function (e) {

        var $this = $(this);
        var $next_input;

        $('#reset_button').on('click', function () {
            $('input').val('');

        });

        if (e.keyCode == 8) {
            $this.val('');

            if ($this.parent().prev().find('input').length) {
                $next_input = $this.parent().prev().find('input');
                console.log('prev a');
            } else if ($this.parent().prev().prev().find('input').length) {
                $next_input = $this.parent().prev().prev().find('input');
                console.log('prev b');
            } else if ($this.parent().parent().prev().find('input:last').length) {
                $next_input = $this.parent().parent().prev().find('input:last');
                console.log('prev c');
            } else if ($this.parent().parent().prev().prev().find('input:last').length) {
                $next_input = $this.parent().parent().prev().prev().find('input:last');
                console.log('prev d');
            } else if ($this.parent().parent().prev().prev().prev().find('input:last').length) {
                $next_input = $this.parent().parent().prev().prev().prev().find('input:last');
                console.log('prev e');
            } else if ($this.parent().parent().parent().prev().find('input:last').length) {
                $next_input = $this.parent().parent().parent().prev().find('input:last');
                console.log('prev f');
            } else if ($this.parent().parent().parent().parent().prev().find('input:last').length) {
                $next_input = $this.parent().parent().parent().parent().prev().find('input:last');
                console.log('prev g');
            }

        } else {
            if ($this.parent().next().find('input').length) {
                $next_input = $this.parent().next().find('input');
                console.log('a');
            } else if ($this.parent().next().next().find('input').length) {
                $next_input = $this.parent().next().next().find('input');
                console.log('b');
            } else if ($this.parent().parent().next().find('input:first').length) {
                $next_input = $this.parent().parent().next().find('input:first');
                console.log('c');
            } else if ($this.parent().parent().next().next().find('input:first').length) {
                $next_input = $this.parent().parent().next().next().find('input:first');
                console.log('d');
            } else if ($this.parent().parent().next().next().next().find('input:first').length) {
                $next_input = $this.parent().parent().next().next().next().find('input:first');
                console.log('e');
            } else if ($this.parent().parent().parent().next().find('input:first').length) {
                $next_input = $this.parent().parent().parent().next().find('input:first');
                console.log('f');
            } else if ($this.parent().parent().parent().parent().next().find('input:first').length) {
                $next_input = $this.parent().parent().parent().parent().next().find('input:first');
                console.log('g');
            }

        }
        $next_input.focus().select();

    });

});

function get_data(){
    var data = [];
    $('input[type=text]').each(function(){
        data.push( $(this).val());
    });
    return data;
}

function save_data(filename, data) {
    localStorage.setItem(filename, JSON.stringify(data));
}

function load_data(filename){
    data = localStorage.getItem(filename);
    console.log(data);

    if (data != '') {
        d = JSON.parse(data);
        console.log(d);
        var c = 0;
        $('input[type=text]').each(function(){
            $(this).val(d[c]); c++;
        });

    }
}

function get_files(){
    var files = localStorage.getItem('files');
    if (files == null) return [];
    return JSON.parse(files);
}

function delete_file(filename){
    var files = get_files();
    const index = files.indexOf(filename);
    if (index > -1) {
      files.splice(index, 1);
      localStorage.remove(filename);
      return true;
    }
    return false;
}

function save_files(files){
    localStorage.setItem('files', JSON.stringify(files));
}

function load_file_select(){
    var all_files = get_files();
    $('#files').html('');
    for(var i in all_files) {
        $('#files').append('<option value="'+all_files[i]+'">'+all_files[i]+'</option>');
    }    
}

function save_new(filename) {
    var files = get_files();
    const index = files.indexOf(filename);
    if (index < 0) {
        files.push(filename);
        save_files(files)
        load_file_select();        
        data = get_data();
        save_data(filename, data);
        return true;
    }    
    return false;
}

function validate_filename(filename)
{
  var filename_regex = /^[0-9a-zA-Z]{4,32}$/;
  return filename_regex.test(filename);
}
