# Bubble Sub

Bubblesub addresses javascript state management requirements when the consumer of the state and the provider of the state can't easily be bound to the through dependency injection. This can be because you are making a library of loosely coupled components or because you do not want to bind all your code into a single bundling/transpiling step. 

## Usage

```shell script

npm install bubblesub

```

### Publishing Data Streams

Initialize and publish prices somewhere in your app. Bind the publication to an element that is a parent all the consuming components. You can bind to `document.body` for simplicity, but doing so essentially makes all your publications global. 

#### publishing
```typescript
import { Publication, publish } from 'bubblesub' 

interface Price { name: string, price: number }
 
const pub: Publication<Price> = publish(parentElement).create<Price>('prices')

pub.update({name: 'goog', price: 1273.74})
pub.update({name: 'fb', price: 193.62})
                          
// ...

pub.close()

```      

#### subscribing

In an element that is a child of the `parentElement` subscribe for prices

```typescript     
import { subscribe } from 'bubblesub'

subscribe(myChildElement)
    .to<Price>('prices')
    .map(price => console.log(price.name + ':' + price.price )) 

```

If the code that publishes the prices exports the `Price` typescript interface then the consumer can benefit from the type support.

### Publishing Behaviour
**\[NEW UNSTABLE API]** 

Sometimes you want to publish some shared behaviour, logic, or a service. You can then share any api.

This is a new convenience api around the base API. It simplifies using the base api and makes the intent clearer.

#### publishing
```typescript
import { declare } from 'bubblesub' 
 
await declare('prices-calc', new PriceService(), document.body)

```

#### subscribing
```typescript
import { use } from 'bubblesub' 
 
let service:PriceService = await use<PriceService>('prices-calc', document.body)

let price:number = service.calcPrice('goog')

```

## API

```typescript   

//Publishing
let p:Publication<T> = publish(parent).create<T>(name)
let p:Publication<T> = publish(parent).create<T>(name, initialValue)
let p:Publication<T> = publish(parent).create<T>(name, initialValue, historySize?)
  
p.name  
p.update(newValue)
p.close()
            
//Subscribing
subscribe(element).to<T>(name).map((i:T) => void)

subscribe(element).to<T>(name).mapFirst((i:T) => void)
subscribe(element).to<T>(name).mapFirst((i:T) => void).toPromise()

subscribe(element).to<T>(name).mapLast((i:T) => void)
subscribe(element).to<T>(name).mapLast((i:T) => void).toPromise()   
```

The new API is an attempt to clarify how to use bubblesub for common cases

```typescript  
//New behavior/service api
declare(name, behaviour) //declared on document.body
declare(name, behaviour, element)

use<T>(name, element) 

//New streaming api
let p:Publication<T> = stream<T>(name) //streaming from document.body
let p:Publication<T> = stream<T>(name, element)
let p:Publication<T> = stream<T>(name, element, historyBuffer)
           
consume<T>(name, element).map((i:T) => void)
consume<T>(name, element).mapFirst((i:T) => void)
consume<T>(name, element).mapLast((i:T) => void)
               
//debugging
bubblesub.debug()

```

## Bubblesub Details

Bubblesub is a simple and lightweight library to share data and behaviour in the browser. You can scope based on your design: share within a closed scope of a few components or share globally; share context without having to bind everything at bundling/transpiling time.

Bubblesub use the DOM and DOM events as a way to declare and find shared data and behaviour. It targets problem spaces such as:
* building web components libraries
* micro frontends
* creating observable contexts that are neither bound to a whole app or to a whole page.

Bubblesub is flexible with a simple api. The publisher and subscriber can operate asynchronously. 

publish:
* singleton services and factories
* asynch data requests and results
* a closable data stream

subscribe for:
* a single service or factory 
* all updates in a publication
* the first update only
* the last update only


Bubblesub is written in Typescript but is useable as a JS or TS dependency. It is published using ES 6 modules

Bubblesub is inspired by a conference talk given by Justin Fagnani (@justinfugnani) who works on Polymer's lit-element and lit-html: [Polymer - Dependency Injection](https://youtu.be/6o5zaKHedTE)

## How it works

* Bubblesub uses events to 'search' up the DOM tree for nodes that provide what you are looking for.
* When found, it registers a callback on any change that happens to that publication
* Bubblesub is written in Typescript and is provided with ES module bundling and d.ts files
* Bubblesub has zero dependencies.

There are some examples in this repo that are implemented as standalone Web Components. Finde them [here](src/example).

## More Examples

### publishing initial value

If the publication has a symantically important initial value you can provide it in the create function.

```typescript
import { Publication } from './publication' 
import { publish } from './publish' 

interface Price { name: string, price: number }

const pub: Publication<Price> = publish(document.body).create<Price>('prices',{name: 'goog', price: 1273.74})

```

### publication history

If it is not important for a late-subscriber to get all of the updates ever made to a publication then you can set the size of the update history. Setting it to zero means no history.

```typescript
import { Publication } from './publication' 
import { publish } from './publish' 

interface Price { name: string, price: number }

const pub: Publication<Price> = publish(document.body).create<Price>('prices',null,0)

```

In the above case no history is maintained. So a late-subscriber interested in the first update will never receive anything. In that case a warning is logged to indicate that subscribing is to late. A late-subscriber interested in the last update will also receive nothing if `Publication.close()` has been called.


### subscribing

You can subscribe for all updates, just the first, or just the last. The last update is only published if the publication is closed.
```typescript
import { subscribe } from './subscribe' 

interface Price { name: string, price: number }

subscribe(this)
      .to<Price>('prices')
      .map((price: Price) => { /*do something with each price*/})
      .mapFirst((price: Price) => { /*do something with the initial price*/})
      .mapLast((price: Price) => { /*do something with the final price*/})

```

#### debugging

To take a peak at the publication currently published use the following command in the browser console.

```javascript

bubblesub.debug()

```

## Usage Examples/Demo

A set of examples devised for demonstrating and testing is available if you checkout the project and build it. For the sake of clarity the examples are implemented using vanilla JS web components.

```shell script
## build the library, the tests, and the examples
npm run build:serve

## serve the built examples
npm run serve

## open browser at http://localhost:8888/assets/index.html
```

[Docs on Examples](src/example/README.md)


## Leveraging the DOM and events

Bubblesub uses DOM events for discovery and binding of publishers and subscribers. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication's value changes the the subscribers are called.

So...
* Bubblesub uses bubbling events in the DOM to link subscribers and publishers
* Bubblesub requires that the subscriber for a Publication be an ancestor of the publication point. This allows for scoping of your pub/sub relationships. Ultimately though the publisher can publish everything on `documet.body` and make it visible to all.
* Bubblesub relies on the hierarchical nature of the DOM to bind publisher and subscriber. A subscriber is bound to the closest ancestor that publishes the wanted Publication.
* There is no central registry of Publications. This means that your Bubblesub bindings can be encapsulated within a parent component, leak nothing, require nothing from outside.
* bubblesub does not require that subscribing happen after an observable is published. The subcriber will keep on trying to find the observable assuming it will eventually appear. On the other hand a late subscriber will receive all the updates that the observable has accumulated before the subscription was established.

