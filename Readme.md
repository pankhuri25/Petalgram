Three levels of authentication and authorization involved in the project:

1. at the View level (showing forms and buttons only if the user is authorized to) 
2. at the Router level (allowing to move to the route only if the user is logged in)
3. at the Controller level (allowing the action to be taken only if the user is allowed to(matching user ids))

Partials: we are using it to distribute the code (all files starting with _underscore are partials)