## Airbnb (sample data) REST API with MongoDB, using Express and Mongoose

[Live demo in Heroku](https://airbnb-restapi.herokuapp.com)

### Rehearsing skills on

- MongoDB, Express and Mongoose
- Express routing and error handling
- Pagination at backend

#

### API Guide:

### Simple API call

/api/all

#

#### Default sorting is by review rating (0-100) descending.

Optional sorting:

`sort=[option]`

Sort options:

`accommodates`  
`address.country`  
`address.country_code`  
`address.street`  
`address.suburb`  
`bathrooms`  
`bedrooms`  
`bed_type`  
`beds`  
`cancellation_policy`  
`cleaning_fee`  
`extra_people`  
`guests_included`  
`minimum_nights`  
`maximum_nights`  
`name`  
`number_of_reviews`  
`price`  
`security_deposit`  
`summary`  
`interaction`  
`house_rules`  
`property_type`  
`room_type`  
`reviews.comments`  
`review_scores.review_scores_rating`

Order by ascending:

`order=asc`

Pagination:

`page=[pagenumber]`

#

### Get all results and filter by page

/api/all`?page=1`

### Get all results and filter by page, sort by option and price ascending

/api/all`?page=1&sort=price&order=asc`

#

### Get results where `[options]` is query type and `[value]` is query value

| Options                              | Value  |
| :----------------------------------- | :----: |
| `accommodates`                       | number |
| `address.country`                    | string |
| `address.country_code`               | string |
| `address.street`                     | string |
| `address.suburb`                     | string |
| `bathrooms`                          | number |
| `bedrooms`                           | number |
| `bed_type`                           | string |
| `beds`                               | number |
| `cancellation_policy`                | string |
| `cleaning_fee`                       | number |
| `extra_people`                       | number |
| `guests_included`                    | number |
| `minimum_nights`                     | string |
| `maximum_nights`                     | string |
| `name`                               | string |
| `number_of_reviews`                  | number |
| `price`                              | number |
| `security_deposit`                   | number |
| `summary`                            | string |
| `interaction`                        | string |
| `house_rules`                        | string |
| `property_type`                      | string |
| `room_type`                          | string |
| `reviews.comments`                   | string |
| `review_scores.review_scores_rating` | number |

### Usage:

/api/query/`[options]`/`[value]`

#

### **Filter**

You can also filter by min value, max value, or range.

Filter options:

`accommodates`  
`bathrooms`  
`bedrooms`  
`beds`  
`cleaning_fee`  
`extra_people`  
`guests_included`  
`minimum_nights`  
`maximum_nights`  
`number_of_reviews`  
`price`  
`security_deposit`

Price range:

-  `filter=price&min=150&max=500`

Filter by maximum price:

-  `filter=price&max=150`

Using `min` and `max` without keyword `filter` defaults to review rating. 

- `min=80`  

#

### Get results and filter by page

- /api/query/`address.country`/`australia?page=1`

### Get results and filter by page, sort by min review rating of 80

- /api/query/`address.country`/`australia?page=1&min=80`

### Get results and filter by page, sort by price and order by price ascending

- /api/query/`name`/`villa?page=1&sort=price&order=asc`

### Get results, filter by page, min / max price and sort by price, filter by price range, order by price ascending

- /api/query/`name`/`villa?sort=price&filter=price&min=100&max=500&order=asc&page=2`

#

### Get all results by range

Options:

`accommodates`  
`bathrooms`  
`bedrooms`  
`beds`  
`cleaning_fee`  
`extra_people`  
`guests_included`  
`minimum_nights`  
`maximum_nights`  
`number_of_reviews`  
`price`  
`security_deposit`

Minimum value:

`min=[value]`

Maximum value:

`max=[value]`

Examples: 

-  /api/range/`[options]?min=[value]&max=[value]`  

-  /api/range/`[options]?max=[value]`  

Range with pagination:

- /api/range/`price?min=150&max=300&order=asc&page=2`

#

### Get result by id

- /api/id/`id-number`

#

### Add new item

- /api/add

#

### Edit item

- /api/edit

#

### Delete item

- /api/delete/`id-number`
