$(document).ready(function() {
    
    $("#contactForm").submit(function(event) {
        event.preventDefault();
        $("#contactForm").hide();
        $("#confirmation").show();
    });
});

