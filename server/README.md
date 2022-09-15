# Backend
## Items
### GET "/api/items"
Get all items
## Cart
### Data format
```json
{
  "_id": { "$oid": "630191aa95ee10bace3537d3" },
  "itemId":  "6545" ,
  "amount":  "5" ,
  "body_location": "Wrist",
  "category": "Medical",
  "companyId":  "11385" ,
  "imageSrc": "data:image/...",
  "name": "Bowflex EZ Pro Strapless Heart Rate Monitor Watch, Black",
  "price": "$12.99"
}
```
### Get "/api/cart"
Get all cart items with the format above
### POST "/api/cart"
#### Required body
```json
    {
        "itemId":6545,
        "amount":2
    }
```
Add a cart Item with the given itemId and amount.
Having error response if item not found, incorrect info or no enough stock
### DELETE "/api/cart"
#### Required body
Amount is optional here.
```json
    {
        "itemId":6545,
        "amount":2
    }
```
Delete the given amount of items from the cart.
If the amount is missing or greater then amount in cart, delete all of this item
### POST "/api/purchase"
Handle the purchase. It remove all cart items without add back to the inventory.




