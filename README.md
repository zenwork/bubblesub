# Bubble Sub

***NOTE: This library is experimental!***

This is a simple library that provides a light weight observable or pub/sub pattern that make the implementation of other common patterns easier :

* Dependency injection
* State Management
* Streaming of data
* Inversion of control
* Abstraction through service and factories

Bubblesub provides the common benefit of sharing services, factories, and data without having to tightly couple component construction. It can also be used to stream data. It is not meant as a silver bullet or a universal tool.

Bubblesub uses the DOM event for discovery and binding of dependencies. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication;s value changes the the subscriber is called 

When creating a set of loosely coupled web components (based on the [specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components) or otherwise) it is often necessary for them to share common services or data. It can be inconvenient or even not desirable to maintain explicit dependencies.

So...
* Bubblesub uses bubbling events in the DOM to link subscribers and publishers
* Bubblesub requires that the publisher of a Publication be an ancestor of the subscriber
* Bubblesub relies on the hierarchical nature of the DOM to bind publisher and subscriber. The subscriber is bound to the closest ancestor that publishes the desired publishable
* There is no central registry of Publications. This means that your Bubblesub bindings can be encapsulated within a parent component, leak nothing, require nothing from outside
 

## Usage

The only required coupling is on the name of the dependency. Bubblesub is implemented in Typescript. So we have the support of typing to make it easier to manage the decoupled implementation.

### Run Example

A simple example devised for testing is available if you checkout the project and build it.

```shell script
yarn build.example
yarn serve
## open browser at http://localhost:8080
```

### Publishing

A high-level component responsible for making a backend request fetches and publishes the result.  

```typescript
import {Publication, publisher } from "bubblesub"; 

let pub:Publication<number> = publisher(this).createPublication('percent', 0)

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

### Examples

Imagine a progress dialog that can be used to show download progress. At the top of the DOM there is a FileService that publishes information about a file being downloaded. The Progress Dialog subscribes to have access to the FileService. The Progress Bar subscribes to receive percent changes. 

See the example [html](example.html) and [js](src/example) implementation

#### DI

#### State Management

#### Data Streaming

#### Inversion of Control

#### Services
