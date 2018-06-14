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