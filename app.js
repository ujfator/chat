var user = cookie.get('user');
if (!user) {
    user = prompt('Choose username');
    if (!user) {
        alert('YOU EITHER PICK SOME STUPID USERNAME OR GET LOST')
    } else {
        cookie.set('user',user)
    }
}

var socket = io();
socket.on('count',function (data) {
    $('.user-count').html(data)
});

socket.on('message',function (data) {
    $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>')
});

$('form').submit(function (e) {
    e.preventDefault();
    var message = $(e.target).find('input').val();
    socket.emit('message', {
        user: cookie.get('user') || 'Anonymous',
        message: message
    });
    e.target.reset();
    $(e.target).find('input').focus()
});