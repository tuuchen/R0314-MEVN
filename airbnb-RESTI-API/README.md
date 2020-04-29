## Airbnb (sample data) REST API with MongoDB, using Express and Mongoose

[Live demo in Heroku](https://airbnb-restapi.herokuapp.com)

### Rehearsing skills on

- MongoDB, Express and Mongoose
- Express routing and error handling
- Pagination at backend made with [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)

#

### API Guide:

### Simple API-call:

- /api/query/all + options

### Detailed results:

- /api/query/`[key]`/`[value]` + options.

Example result:

```json
{
  "docs": [
    {
      "_id": "10047964",
      "listing_url": "https://www.airbnb.com/rooms/10047964",
      "name": "Charming Flat in Downtown Moda",
      "summary": "Fully furnished 3+1 flat decorated with vintage style.",
      "space": "The apartment is composed of 1 big bedroom with double sized bed.",
      "description": "Fully furnished 3+1 flat decorated with vintage style.",
      "neighborhood_overview": "With its diversity Moda- Kadikoy is one of the most colorfull neighbourhood of Istanbul.",
      "notes": "",
      "transit": "",
      "access": "",
      "interaction": "",
      "house_rules": "Be and feel like your own home, with total respect and love..this would be wonderful!",
      "property_type": "House",
      "room_type": "Entire home/apt",
      "bed_type": "Real Bed",
      "minimum_nights": "2",
      "maximum_nights": "1125",
      "cancellation_policy": "flexible",
      "last_scraped": "2019-02-18T05:00:00.000Z",
      "calendar_last_scraped": "2019-02-18T05:00:00.000Z",
      "first_review": "2016-04-02T04:00:00.000Z",
      "last_review": "2016-04-02T04:00:00.000Z",
      "accommodates": 6,
      "bedrooms": 2,
      "beds": 6,
      "number_of_reviews": 1,
      "bathrooms": {
        "$numberDecimal": "1.0"
      },
      "amenities": [
        "TV",
        "Cable TV",
        "Internet",
        "Wifi",
        "Kitchen",
        "Free parking on premises",
        "Pets allowed",
        "Pets live on this property",
        "Cat(s)",
        "Heating",
        "Family/kid friendly",
        "Washer",
        "Essentials",
        "Shampoo",
        "24-hour check-in",
        "Hangers",
        "Hair dryer",
        "Iron",
        "Laptop friendly workspace"
      ],
      "price": {
        "$numberDecimal": "527.00"
      },
      "cleaning_fee": {
        "$numberDecimal": "211.00"
      },
      "extra_people": {
        "$numberDecimal": "211.00"
      },
      "guests_included": {
        "$numberDecimal": "1"
      },
      "images": {
        "thumbnail_url": "",
        "medium_url": "",
        "picture_url": "https://a0.muscache.com/im/pictures/231120b6-e6e5-4514-93cd-53722ac67de1.jpg?aki_policy=large",
        "xl_picture_url": ""
      },
      "host": {
        "host_id": "1241644",
        "host_url": "https://www.airbnb.com/users/show/1241644",
        "host_name": "Zeynep",
        "host_location": "Istanbul, Istanbul, Turkey",
        "host_about": "Z.",
        "host_thumbnail_url": "https://a0.muscache.com/im/users/1241644/profile_pic/1426581715/original.jpg?aki_policy=profile_small",
        "host_picture_url": "https://a0.muscache.com/im/users/1241644/profile_pic/1426581715/original.jpg?aki_policy=profile_x_medium",
        "host_neighbourhood": "Moda",
        "host_is_superhost": false,
        "host_has_profile_pic": true,
        "host_identity_verified": true,
        "host_listings_count": 2,
        "host_total_listings_count": 2,
        "host_verifications": [
          "email",
          "phone",
          "facebook",
          "reviews",
          "jumio",
          "government_id"
        ]
      },
      "address": {
        "street": "Kadıköy, İstanbul, Turkey",
        "suburb": "Moda",
        "government_area": "Kadikoy",
        "market": "Istanbul",
        "country": "Turkey",
        "country_code": "TR",
        "location": {
          "type": "Point",
          "coordinates": [29.03133, 40.98585],
          "is_location_exact": true
        }
      },
      "availability": {
        "availability_30": 27,
        "availability_60": 57,
        "availability_90": 87,
        "availability_365": 362
      },
      "review_scores": {
        "review_scores_accuracy": 10,
        "review_scores_cleanliness": 10,
        "review_scores_checkin": 10,
        "review_scores_communication": 10,
        "review_scores_location": 10,
        "review_scores_value": 10,
        "review_scores_rating": 100
      },
      "reviews": [
        {
          "_id": "68162172",
          "date": "2016-04-02T04:00:00.000Z",
          "listing_id": "10047964",
          "reviewer_id": "33536670",
          "reviewer_name": "Mihra",
          "comments": "Zeynep was a most welcoming and generous host, with a gorgeous, comfortable flat - as advertised!"
        }
      ],
      "id": "10047964"
    }
  ],
  "totalDocs": 5564,
  "limit": 20,
  "totalPages": 279,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

`docs` - Array of documents  
 `totalDocs` - Total number of documents in collection that match a query  
 `limit` - Results per page  
 `totalPages` - Total pages with current search parameters  
 `page` - Current page  
 `pagingCounter` - The starting sl. number of first document.  
 `hasPrevPage` - Availability of prev page.  
 `hasNextPage` - Availability of next page.  
 `prevPage` - Previous page number if available or NULL  
 `nextPage` - Next page number if available or NULL

#

### Get all results and paginate

- /api/country/all`?page=1`

### Get all results and paginate, sort by price and order by price ascending

- /api/country/all`?sort=price&order=asc?page=1`

### Get all results, paginate and filter by price

- /api/country/all`?filter=price&max=400&page=1`

#

### Get results and paginate

- /api/country/`australia?page=1`

### Get results and paginate, filter by max price 100€

- /api/country/`australia?filter=price&max=100&page=1`

### Get results and paginate, sort by price, order by price ascending

- /api/country/`australia/name/villa?sort=price&order=asc&page=1`

### Get results and paginate, sort by price, filter by price range, order by price ascending

- /api/country/`australia/name/villa?sort=price&filter=price&min=100&max=500&order=asc&page=1`

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

#

## Default sorting is by review rating (0-100) descending.

### **Optional sorting**

- `sort=[key]`

### **Order by ascending**

- `order=asc`

### **Pagination**

Page number:

- `page=[pagenumber]`

Results to show per page:

- `perPage=[value]`

### **Filter**

You can also filter by min value, max value, or range.

- `filter=[key]&min=[value]&max=[value]`

Filter options for example (numbers):

| `[key]`                              | `[value]` |
| :----------------------------------- | :-------: |
| `accommodates`                       |  number   |
| `bathrooms`                          |  number   |
| `bedrooms`                           |  number   |
| `beds`                               |  number   |
| `cleaning_fee`                       |  number   |
| `extra_people`                       |  number   |
| `guests_included`                    |  number   |
| `number_of_reviews`                  |  number   |
| `price`                              |  number   |
| `security_deposit`                   |  number   |
| `review_scores.review_scores_rating` |  number   |

### Usage:

Price range:

- `filter=price&min=150&max=500`

Filter by maximum price:

- `filter=price&max=150`

#

### Get results where `[key]` is search type and `[value]` is value to find

Example of numbers:

| `[key]`                              | `[value]` |
| :----------------------------------- | :-------: |
| `accommodates`                       |  number   |
| `bathrooms`                          |  number   |
| `bedrooms`                           |  number   |
| `beds`                               |  number   |
| `cleaning_fee`                       |  number   |
| `extra_people`                       |  number   |
| `guests_included`                    |  number   |
| `number_of_reviews`                  |  number   |
| `price`                              |  number   |
| `security_deposit`                   |  number   |
| `review_scores.review_scores_rating` |  number   |

Example of strings:

| `[key]`                | `[value]` |
| :--------------------- | :-------: |
| `address.country`      |  string   |
| `address.country_code` |  string   |
| `address.street`       |  string   |
| `address.suburb`       |  string   |
| `bed_type`             |  string   |
| `cancellation_policy`  |  string   |
| `minimum_nights`       |  string   |
| `maximum_nights`       |  string   |
| `name`                 |  string   |
| `summary`              |  string   |
| `interaction`          |  string   |
| `house_rules`          |  string   |
| `property_type`        |  string   |
| `room_type`            |  string   |
| `reviews.comments`     |  string   |
