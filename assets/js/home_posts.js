{
    // method which sends/submits the form data to controller action for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        // prevent form data from getting submitted naturally
        newPostForm.submit(function(e){
            e.preventDefault();
        
            // manually submit using ajax:
            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(), //converts FORM data into Json format
                success: function(data){
                    console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM

    createPost();
}