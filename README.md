
first to use this project
- npm install



what's new in V 0.1.2

- New routes method, in v 0.1 we only used 1 routes for store. but in v 0.1.2 we was moved 
 all routes to different files, base with the function of the routes

 12 October 2017
- Show All jeans and tshirt has been added 
- Improves Bug, when user was login user still can get access to login routes, but now it will redirecting to home
- Repair bug when user has login and go to show all product, login name will dissappear and replace by login text again

Bug :
- cart in show all product will not appear, cause I'm still not adding branch to procces what block code will execute
- when i login with other account then I write another routes to open another account server will drop (Fixed Maybe)
- when users was logged in with theri account then users write routes for another users he can log in with that users (Fixed)

14 October 2017

22 October 2017
- When user isn't login onto their account but, user has added a product to their cart then user login onto their account
  their product in their cart move to their database, then when product was added to database and user logout their product will
  disappear
Bug : 
- when user was adding some product to their cart then user login onto their account, user can't access to cart router
- bug in login router, because i was edited login system, so i must edit again in login for fixed a bug

Note :
- bug i was found: maybe because i'm still not marging session with database so program willn't adding transaction when 
  database was filled and session to, program only can adding cart with database or session only

23 October 2017
Bug : Still doesn't found any bug (maybe)
chanelog :
  - bug fixed
  - minor update

Note : - maybe 22 October 2017's bug was dissappear (i thought) i will find any bug again


24 October 2017
Chanelog:
 - adding routes for checkout
Bug :
 - Checout still can't get session to print userlogin



- what's majority features i want to add to this project
    - email system
    - had ability to upload pictures
    - when user isn't login but he/she has adding some items to cart and he/she login the items will add to their account, so when 
        she/ he logout the cart will empty too

I forgoten to write chanelog in v 0.1, maybe something when i want some features
or I was added some features I must write to chanelog



Sorry for my bad english skill