$(document).ready(function() {

    $('.box').append('<input type="text" class="s1" maxlength="1" >');
    $('.box2').append('<input type="text" class="s1" maxlength="1" >');
    $('.box3').append('<input type="text" class="s1" maxlength="1" >');

    $('#reset_button').on('click', function() {
        $('input[type=text]').val('');
    });

    $('#files').on('change', function() {
        if ($(this).val() != "") {
            load_data($(this).val());
            $('#filename').html($(this).val());
        }
    });

    $('#save_button').on('click', function() {
        if ($('#filename').text() != 'untitled') {
            save_data($('#filename').text(), get_data());
            alert('Data saved');
        } else {
            $('#save_as_button').click();
        }
    });

    $('#delete_button').on('click', function() {
        var filename = $('#filename').text();
        if (filename != 'untitled') {
            if (confirm('Are you sure you want to delete ' + filename)) {
                delete_file(filename);
            }
        }
    });

    $('#save_as_button').on('click', function() {
        filename = prompt("Enter file name");

        if (validate_filename(filename) && (filename !== null)) {
            if (!save_new(filename)) {
                alert('File name already exists. Pick a different file name.');
            } else {
                $('#filename').html(filename);
            }
        } else {
            alert('Invalid filename. Alphanumeric only. No spaces and dashes.');
        }
    });

    $('#new_button').on('click', function() {
        $('#filename').html('untitled');
        $('input[type=text]').val('');
        $('#files').val('');
    });

    load_file_select();

    $('#reset_button').on('click', function() {
        $('input').val('');

    });

    $('body').on('input keypress', 'input.s1', function(e) {

        var $this = $(this);
        var $next_input;
        console.log(e);
        if (e.which != 8) {
            if ($this.parent().next().find('input').length) {
                $next_input = $this.parent().next().find('input');
            } else if ($this.parent().next().next().find('input').length) {
                $next_input = $this.parent().next().next().find('input');
            } else if ($this.parent().parent().next().find('input:first').length) {
                $next_input = $this.parent().parent().next().find('input:first');
            } else if ($this.parent().parent().next().next().find('input:first').length) {
                $next_input = $this.parent().parent().next().next().find('input:first');
            } else if ($this.parent().parent().next().next().next().find('input:first').length) {
                $next_input = $this.parent().parent().next().next().next().find('input:first');
            } else if ($this.parent().parent().parent().next().find('input:first').length) {
                $next_input = $this.parent().parent().parent().next().find('input:first');
            } else if ($this.parent().parent().parent().parent().next().find('input:first').length) {
                $next_input = $this.parent().parent().parent().parent().next().find('input:first');
            }

            if (e.currentTarget.value.length >= 1) {
                $next_input.focus().select();
            }
        }

    }).on('keydown', 'input.s1', function(e) {

        var $this = $(this);
        var $next_input;

        if (e.keyCode == 8) {
            $this.val('');

            if ($this.parent().prev().find('input').length) {
                $next_input = $this.parent().prev().find('input');
            } else if ($this.parent().prev().prev().find('input').length) {
                $next_input = $this.parent().prev().prev().find('input');
            } else if ($this.parent().parent().prev().find('input:last').length) {
                $next_input = $this.parent().parent().prev().find('input:last');
            } else if ($this.parent().parent().prev().prev().find('input:last').length) {
                $next_input = $this.parent().parent().prev().prev().find('input:last');
            } else if ($this.parent().parent().prev().prev().prev().find('input:last').length) {
                $next_input = $this.parent().parent().prev().prev().prev().find('input:last');
            } else if ($this.parent().parent().parent().prev().find('input:last').length) {
                $next_input = $this.parent().parent().parent().prev().find('input:last');
            } else if ($this.parent().parent().parent().parent().prev().find('input:last').length) {
                $next_input = $this.parent().parent().parent().parent().prev().find('input:last');
            }
            $next_input.focus(); //.select();
        }
    });

});

function get_data() {
    var data = [];
    $('input[type=text]').each(function() {
        data.push($(this).val());
    });
    return data;
}

function save_data(filename, data) {
    localStorage.setItem(filename, JSON.stringify(data));
}

function load_data(filename) {
    data = localStorage.getItem(filename);
    console.log(data);

    if (data != '') {
        d = JSON.parse(data);
        console.log(d);
        var c = 0;
        $('input[type=text]').each(function() {
            $(this).val(d[c]);
            c++;
        });

    }
}

function get_files() {
    var files = localStorage.getItem('files');
    if (files == null) return [];
    return JSON.parse(files);
}

function delete_file(filename) {
    var files = get_files();
    const index = files.indexOf(filename);
    if (index > -1) {
        files.splice(index, 1);
        localStorage.setItem('files', JSON.stringify(files));
        localStorage.removeItem(filename);
        load_file_select();
        $('#new_button').click();
        return true;
    }
    return false;
}

function save_files(files) {
    localStorage.setItem('files', JSON.stringify(files));
}

function load_file_select() {
    var all_files = get_files();
    $('#files').html('<option value="">[--- select saved file ---]</option>');
    for (var i in all_files) {
        $('#files').append('<option value="' + all_files[i] + '">' + all_files[i] + '</option>');
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

function validate_filename(filename) {
    var filename_regex = /^[0-9a-zA-Z]{4,32}$/;
    return filename_regex.test(filename);
}