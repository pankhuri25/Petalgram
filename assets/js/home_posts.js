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
                success: function(content){
                    console.log(content);
                    let newPost = newPostDom(content.data.post);
                    // append the post on top (prepend)
                    $('#posts-list-container > ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}"> 
                    <p> 
                        <small>
                            <!-- Delete button -->
                            <a class="delete-post-button" href="/posts/destroy/${post.id}"> x </a>
                        </small>
                
                        <!-- Show post's content -->
                        ${post.content}
                        <br>
                        <!-- Show the user's name who posted it -->
                        <small>${post.user.name}</small>
                        
                    </p>
                    <div class="post-comments">
                       
                        <form action="/comments/add-comment" id="new-comment-form" method="POST">
                            <textarea name="content" cols="30" rows="3" placeholder="Add a Comment.." required></textarea>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    </div>
                </li>`)
    }

    createPost();
}