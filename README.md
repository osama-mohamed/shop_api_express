# Shop API Express By Express, Mongoose.

[<img src="https://nodejs.org/static/images/logo.svg" width="200" title="Shop API Express" >]()
[<img src="https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg" width="250" title="Shop API Express" >]()


## Shop API Express website contains:
* User register
* User login
* Delete User
* Show all products
* Create new product with img
* Show product detail
* Update product
* Delete product
* Show all orders
* Create new order
* Show order detail
* Delete order
* Token (JWT) valid for one hour
* Route protection


## Usage :
### Run project by :

``` javascript

# run 

1. npm i

2. npm start

```

That's it.

## Done :

Now the project is running at `http://localhost:3000` and your routes is:


| Route                                                      | HTTP Method 	   | Description                           	      |
|:-----------------------------------------------------------|:----------------|:---------------------------------------------|
| {host}/api/users/signup                          	         | POST       	   | User register                                |
| {host}/api/users/login        	                           | POST        	   | User login                                   |
| {host}/api/users/{userId}        	                         | DELETE      	   | Delete User                                  |
| {host}/api/products                           	           | GET       	     | Show all products                            |
| {host}/api/products                             	         | POST       	   | Create new product with img                  |
| {host}/api/products/{productId}                  	         | GET        	   | Show product detail                          |
| {host}/api/products/{productId}                  	         | PATCH        	 | Update product                               |
| {host}/api/products/{productId}                  	         | DELETE        	 | Delete product                               |
| {host}/api/orders                             	           | GET        	   | Show all orders                              |
| {host}/api/orders                               	         | POST        	   | Create new order                             |
| {host}/api/orders/{orderId}                  	             | GET           	 | Show order detail                            |
| {host}/api/orders/{orderId}                  	             | DELETE        	 | Delete order                                 |



For detailed explanation on how project work, read the [Node Docs](https://nodejs.org/en/docs/), [Express Docs](http://expressjs.com/en/guide/routing.html) and [MongoDB Docs](https://docs.mongodb.com/)

## Developer
This project made by [Osama Mohamed](https://www.linkedin.com/in/osama-mohamed-ms/)

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

