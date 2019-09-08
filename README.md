# Bubble Sub

***NOTE: This library is experimental!***

This is a simple library that provides a light weight alternative to dependency injection libraries based on DOM events.

Bubblesub provides the common benefit of sharing services, factories, and data without having to tightly couple component construction. It can also be used to stream data. It is not meant as a silver bullet or a universal tool.

Bubblesub uses the DOM event for discovery and binding of dependencies. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication;s value changes the the subscriber is called  

## Usage

The only required coupling is on the name of the dependency. Bubblesub is implemented in Typescript. So we have the support of typing to make it easier to manage the decoupled implementation.

### Run Example

```shell script
yarn build.example
yarn serve
## open browser at http://localhost:8080
```

### Publishing

A high-level component responsible for making a backend request fetches and publishes the result. 

```typescript
import {Publication, publisher } from "bubblesub"; 

let pub:Publication<number> = publisher(this.root).createPublication('percent', 0)

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

### Example

Imagine a progress dialog that can be used to show download progress. At the top of the DOM there is a FileService that publishes information about a file being downloaded. The Progress Dialog subscribes to have access to the FileService. The Progress Bar subscribes to receive percent changes. 

```html
<body>
    <!-- file service is published from the body   -->
    <progress-dialog>
        <!-- progress dialog subscribes to the file service to get file download updates -->
        <progress-bar>
            <!-- progress bar subscribes to the 'percent' publishable which the progress dialog publishes-->
        </progress-bar>
    </progress-dialog>

    <script type="module" src="./lib/index.umd.min.js"></script>
</body>

```

See the example [html](example.html) and [js](src/test) implementation
