Three levels of authentication and authorization involved in the project:

1. at the View level (showing forms and buttons only if the user is authorized to) 
2. at the Router level (allowing to move to the route only if the user is logged in)
3. at the Controller level (allowing the action to be taken only if the user is allowed to(matching user ids))

Partials: we are using it to distribute the code (all files starting with _underscore are partials)

-------------------------------------------------------------------------------------------------

Deletion of Post via AJAX (Asynchronous JavaScript and XML):
To make the creation and deletion of posts and comments Dynamic, we'll use AJAX (XHR requests)

res.redirect('back') is not done since the default is prevented (therefore no new redirection of website, hence dynamic!)

Flow: New Post Form will not get submitted automatically. 

Home.ejs -> routed to /posts/create-post (posts_controller.js) -> XHR req found -> JSON sent to javascript file (homes_posts.js) -> createPost method called -> post created and added to DOM -> deletePost works only if delete button is clicked -> END