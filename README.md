# Bubble Sub

***NOTE: This library is experimental!***

Bubblesub is a simple and lightweight library to manage observables. It builds on top of the DOM and event web standards. It's reduces the code needed without introducing a large library. It targets mid-range problems such as:
* building web components libraries
* micro frontends
* create observable contexts that are neither bound to a whole app or to a whole page.  

Bubblesub is flexible enough to accomplish different types of integrations:
* share a singleton services or factory
* share data
* stream data from a websocket or SSE to multiple listening components

Bubblesub is written in Typescript but useable as a JS or TS dependency. It is published using ES 6 modules

Bubblesub is inspired by a conference talk given by Justin Fagnani (@justinfugnani) who works on Polymer's lit-element and lit-html: [Polymer - Dependency Injection](https://youtu.be/6o5zaKHedTE)

## It's Easy

There are some examples in this repo that are implemented as standalone Web Components. Finde them [here](src/example).

## How it works

* Bubbles sub use events to 'search' up the DOM for nodes that provide what you are lokking for. 
* When found, it registers a callback on any change that happens to that thing
* publishing and subscribing can be accomplished through typescript decorators (`@pub`, `@sub`) or through plain JS api. 
* Bubblesub is written in Typescript and is provided with ES module bundling and d.ts files
* Bubblesub has zero dependencies and targets web component (ie: custom elements, shadow dom) development. 

### Publishing a Stream

One common case for observable is a stream of data
 
#### publishing
```typescript
import { Publication } from './publication' 
import { publish } from './publish'

interface Price { name: string, price: number }
 
const pub: Publication<Price> = publish(document.body).create<Price>('prices')
pub.update({name: 'goog', price: 1273.74})
pub.update({name: 'fb', price: 193.62})

pub.close()

```

#### subscribing
```typescript
import { subscribe } from './subscribe' 

interface Price { name: string, price: number }

subscribe(this)
      .to<Price>('prices')
      .map((price: Price) => { /*do something with all the price*/})
      .mapFirst((price: Price) => { /*do something with the initial price*/})
      .mapLast((price: Price) => { /*do something with the final price*/})

```

### Publihing a Service

#### publishing

```typescript
import {ServiceImpl, ServiceInterface } from 'my-app' 
import { publish } from 'bubblesub' 

const pub = publish(document.body).create<ServiceInterface>('service')
pub.update(new ServiceImpl())

```

#### subscribing

```typescript
import { subscribe } from 'bubblesub' 
import { ServiceInterface } from 'my-app' 

const service:ServiceInterface = await subscribe(this)
      .to<ServiceInterface>('service')
      .toPromise()

subscribe(this)
      .to<ServiceInterface>('service')
      .mapFirst((service:ServiceInterface)=>{/* do something with the service*/})
      
```

## Leveraging the DOM and events

Bubblesub uses DOM events for discovery and binding of publishers and subscribers. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication's value changes the the subscribers are called. 

So...
* Bubblesub uses bubbling events in the DOM to link subscribers and publishers
* Bubblesub requires that the publisher of a Publication be an ancestor of the subscriber
* Bubblesub relies on the hierarchical nature of the DOM to bind publisher and subscriber. A subscriber is bound to the closest ancestor that publishes the wanted Publication. 
* There is no central registry of Publications. This means that your Bubblesub bindings can be encapsulated within a parent component, leak nothing, require nothing from outside.
* bubblesub does not require that subscribing happen after an observable is published. The subcriber will keep on trying to find the observable assuming it will eventually appear. On the other hand a late subscriber will receive all the updates that the observable has accumulated before the subscription was established.   

## Decorators

see: [experimental decorators](DECORATORS.md)

## Usage

The only required coupling is on the name of the dependency. Bubblesub is implemented in Typescript. So we have the support of typing to make it easier to manage the decoupled implementation.

### Run Examples

A set of examples devised for demonstrating and testing is available if you checkout the project and build it. For the sake of clarity the examples are implemented using vanilla JS web components.

```shell script
## build the library, the tests, and the examples
yarn build:serve

## serve the built examples
yarn serve

## open browser at http://localhost:8888
```

[Docs on Examples](src/example/README.md)

