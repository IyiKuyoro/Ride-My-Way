$('#sign-in-btn').click(function(event){
    event.preventDefault();
    console.log("Me");
    window.location.replace('dashboard.html');
});

$('.vrBtn').click(function(event){
    $('#ridedetails').css('left', '80%');
});

$('#close').click(function(event){
    $('#ridedetails').css('left', '100%');
});

$('.accept').click(function(event){
    var initT = new Date().getSeconds();

    var timer = setInterval(function(){
        var t = new Date().getSeconds();
        if(t - initT === 2){
            $('#message').html('<p>You have successfully added <b>Rider Name</b> to the Trip.</p>');
            $('#message').css('visibility', 'visible');
        }

        if(t - initT === 5){
            $('#message').css('visibility', 'hidden');
            clearInterval(timer);
        }
    }, 1000);
});

$('.reject').click(function(event){
    var initT = new Date().getSeconds();

    var timer = setInterval(function(){
        var t = new Date().getSeconds();
        if(t - initT === 2){
            $('#message').html('<p>You rejected <b>Rider Name</b>\'s request.</p>');
            $('#message').css('visibility', 'visible');
        }

        if(t - initT === 5){
            $('#message').css('visibility', 'hidden');
            clearInterval(timer);
        }
    }, 1000);
});