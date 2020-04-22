## Airbnb (sample data) REST API with MongoDB, using Express and Mongoose

[Live demo in Heroku](https://airbnb-restapi.herokuapp.com)

### Rehearsing skills on

- MongoDB, Express and Mongoose
- Express routing and error handling
- Pagination at backend

#

### API Guide:

### Simple dataset

- /api/all

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

### **Filter**

You can also filter by min value, max value, or range.

- `filter=[option]&min=[value]&max=[value]`

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

### Example:

Price range:

- `filter=price&min=150&max=500`

Filter by maximum price:

- `filter=price&max=150`

#

### Get all results and paginate

- /api/all`?page=1`

### Get all results and paginate, sort by price and order by price ascending

- /api/all`?sort=price&order=asc?page=1`

### Get all results, paginate and filter by price

- /api/all`?filter=price&max=400&page=1`

#

### Get results where `[options]` is query type and `[value]` is query value

| `[options]`                              | `[value]`  |
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

- /api/query/`[options]`/`[value]`

### Get results and paginate

- /api/query/`address.country`/`australia?page=1`

### Get results and paginate, filter by max price 100€

- /api/query/`address.country`/`australia?filter=price&max=100&page=1`

### Get results and paginate, sort by price, order by price ascending

- /api/query/`name`/`villa?sort=price&order=asc&page=1`

### Get results and paginate, sort by price, filter by price range, order by price ascending

- /api/query/`name`/`villa?sort=price&filter=price&min=100&max=500&order=asc&page=1`

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
