## Airbnb (sample data) REST API with MongoDB, using Express and Mongoose

[Live demo in Heroku](https://airbnb-restapi.herokuapp.com)

### Rehearsing skills on

- MongoDB, Express and Mongoose
- Express routing and error handling
- Pagination at backend

#

### API Guide:

#### Default sorting is by reviews descending.

Sorting:

`sort=[option]`  

Options:

`accommodates` : number  
`address.country` : string  
`address.country_code` : string  
`address.street` : string  
`address.suburb` : string  
`bathrooms` : number  
`bedrooms` : number  
`bed_type` : string  
`beds` : number  
`cancellation_policy` : string  
`cleaning_fee` : number  
`extra_people` : number  
`guests_included` : number  
`minimum_nights` : string  
`maximum_nights` : string  
`name` : string  
`number_of_reviews` : number  
`price` : number  
`security_deposit` : number  
`summary` : string  
`interaction` : string  
`house_rules` : string  
`property_type` : string  
`room_type` : string  
`reviews.comments` : string

Order by ascending:

`order=asc`

Pagination:

`page=[pagenumber]`

#

### Simple API call

/api/all

#

### Get all results and filter by page

/api/all`?page=1`

### Get all results and filter by page, sort by option and price ascending

/api/all`?page=1&sort=price&order=asc`

#

### Get results where `[options]` is query type and `[value]` is query value 

/api/query/`[options]`/`[value]`

Optional:

/api/query/`[options]`/`[value][sort][paginate][order]` 

#

### Get results and filter by page

/api/query/`address.country`/`australia?page=1`

#

### Get results and filter by page, sort by option and price ascending

/api/query/`name`/`villa?page=1&sort=price&order=asc`

#

### Get results, filter by page, min / max price and sort by option and price ascending

/api/query/`name`/`villa?sort=price&min=100&max=500&order=asc&page=2`

#

### Get result by range

Options:

`accommodates` : number  
`bathrooms` : number  
`bedrooms` : number  
`beds` : number  
`cleaning_fee` : number  
`extra_people` : number  
`guests_included` : number  
`minimum_nights` : number  
`maximum_nights` : number  
`number_of_reviews` : number  
`price` : number  
`security_deposit` : number

Minimum value:

`min=[value]`

Maximum value:

`max=[value]`

/api/range/`[options]?max=[value]`

Range with pagination:

/api/range/`price?min=150&max=300&order=asc&page=2`

#

### Get result by id

/api/id/`id-number`

#

### Add new item

/api/add

#

### Edit item

/api/edit

#

### Delete item

/api/delete/`id-number`
