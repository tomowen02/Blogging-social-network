$(document).ready(function() {
    const followButtons = document.getElementsByClassName("follow-unfollow-button");
    Array.from(followButtons).forEach(button => {
        button.addEventListener('click', function() {
            console.log($(this).data('url'))
            $.ajax({
                type: 'PUT',
                url: $(this).data('url'),
                success: function(response) {
                    console.log('Document updated:', response);
                },
                error: function(error) {
                    console.error('Failed to update document:', error);
                },
            });
        });
    });
});