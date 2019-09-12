# Bubble Sub

***NOTE: This library is experimental!***

Bubblesub is a simple library to create observables. It leverages the DOM and browser events to reduce coupling and making things simple. 

You can easily implement:
* dependency injection
* state management
* streaming of data
* inversion of control
* shared services and factories

Bubblesub comes out of an urge to free JS/TS development from big frameworks. It is not meant as a silver bullet or a universal solution.

This approach is inspired from a talk by Justin Fagnani (@justinfugnani) who heads work on Polymer lit-element and lit-html. A recording can be found on youtube: [Polymer - Dependency Injection](https://youtu.be/6o5zaKHedTE)

## Leveraging the DOM and events

Bubblesub uses DOM events for discovery and binding of publishers and subscribers. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication's value changes the the subscribers are called. 

So...
* Bubblesub uses bubbling events in the DOM to link subscribers and publishers
* Bubblesub requires that the publisher of a Publication be an ancestor of the subscriber
* Bubblesub relies on the hierarchical nature of the DOM to bind publisher and subscriber. A subscriber is bound to the closest ancestor that publishes the wanted Publication. 
* There is no central registry of Publications. This means that your Bubblesub bindings can be encapsulated within a parent component, leak nothing, require nothing from outside.
 

## Usage

The only required coupling is on the name of the dependency. Bubblesub is implemented in Typescript. So we have the support of typing to make it easier to manage the decoupled implementation.

### Run Examples

A set of examples devised for demonstrating and testing is available if you checkout the project and build it. For the sake of clarity the examples are implemented using vanilla JS web components.

```shell script
yarn build.example
yarn serve
## open browser at http://localhost:8080
```

### Publishing

A high-level component responsible for making a backend request fetches and publishes the result.  

```typescript
import {Publication, publisher } from "bubblesub"; 

let pub:Publication<number> = publisher(this).create('percent', 0)

fetch('http://example.com/progress/status')
  .then((response) =>response.json())
  .then((progress) => pub.updateValue(progress.status));

```

### Subscribing

In some component we consume and display the percentage value.

```typescript
import { subscriber } from "bubblesub";

subscriber(this)
.request( 'percent', (percent: number) => this.innerHTML = `<span>${percent}</span>` )
```   

## Examples

#### Progress Bar

A basic example implementing a virtual progress dialog can be found in the code

See the example [html](src/example/progress/index.html) and [js](src/example/progress) implementation

#### DI

This example shows how a simple counter service can be injected into a web component. The component is coupled on the name (`'service.counter'`) and the declared typescript interface (`SequenceService`)

See this example's [html](src/example/di/index.html) and [js](src/example/di) implementation
#### State Management

#### Data Streaming

#### Inversion of Control

#### Services
