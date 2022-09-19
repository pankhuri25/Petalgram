
    class PostCommentsss{
        // constructor is used to initialize the instance of the class whenever a new instance is created
        constructor(postId){
            this.postId = postId;
            this.postContainer = $(`#post-${postId}`);
            this.newCommentForm = $(`#post-${postId}-comments-form`);

            this.addComment(postId);
    
            let self = this;
            // call for all the existing comments
            $(' .delete-comment-button', this.postContainer).each(function(){
                self.deleteComment($(this));
            });
        }
        addComment(postId){
            let pSelf = this;
            
            this.newCommentForm.submit(function(e){
                e.preventDefault();
                let self = this;
                                
                $.ajax({
                    type: 'post', // request method: POST
                    url: '/comments/add-comment',
                    data: $(self).serialize(),
                    success: function(content){
                        console.log(content);
                        let newComment = pSelf.newCommentDom(content.data.comment);
                        // append the comment on top (prepend)
                        $(`#post-comments-${postId}`).prepend(newComment);
                        pSelf.deleteComment($(' .delete-comment-button', newComment));
                        new Noty({
                            theme: 'relax',
                            text: "Comment posted!",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },
                    error: function(error){
                        console.log(error.responseText);
                        new Noty({
                            theme: 'relax',
                            text: 'Error in posting Comment!',
                            type: 'error', //color scheme
                            layout: 'topRight',
                            timeout: 1500
                        }).show();
                    }
                });
    
            });
        }
    
        // method to create a post in DOM
        newCommentDom(comment){
            return $(`<li id="comment-${comment._id}">
                        <p>
                            <small>
                                <!-- Delete button -->
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}"> x </a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                    </li>`)
        }
    
        // method to delete the comment from DOM
        deleteComment(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();
    
                $.ajax({
                    type: 'get',
                    url: $(deleteLink).prop('href'),
                    success: function(content){
                        console.log(content);
                        // delete the comment using comment id
                        $(`#comment-${content.data.comment_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Comment Deleted!",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },
                    error: function(error){
                        console.log(error.responseText);
                        new Noty({
                            theme: 'relax',
                            text: 'Error in deleting Comment!',
                            type: 'error', //color scheme
                            layout: 'topRight',
                            timeout: 1500
                        }).show();
                    }
                });
            });
        }
    }
