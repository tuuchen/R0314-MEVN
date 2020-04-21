## Airbnb (sample data) REST API with MongoDB, using Express and Mongoose

[Live demo in Heroku](https://airbnb-restapi.herokuapp.com/api/all)

### Rehearsing skills on

- MongoDB, Express and Mongoose
- Express routing and error handling
- Pagination at backend

#

#### API Guide:

### Default sorting is by reviews descending.

Sort options: 

`sort=[option]`

`price`  
`beds`  
`accommodates`  
`bedrooms`  
`number_of_reviews`  
`bathrooms`   
`security_deposit`     
`cleaning_fee`   
`extra_people`   
`guests_included`   

Order by ascending: 

`order=asc`

Pagination:

`page=[pagenumber]`

### Simple API call

/api/all

### Get all results and filter by page

/api/all`?page=1`  

### Get all results and filter by page, sort by option and price ascending

/api/all`?page=1&sort=price&order=asc`  

### Get result by id 

/api/id/`id-number`  

### Get result by keyword

/api/q/`keyword` 

### Get result by keyword and filter by page

/api/q/`keyword?page=1`  

### Get result by keyword and filter by page, sort by option and price ascending

/api/q/`keyword?page=1&sort=price&order=asc`  

### Add new item

/api/add  

### Edit item

/api/edit 

### Delete item

/api/delete/`id-number`
