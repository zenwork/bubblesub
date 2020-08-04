# Progress Bar

This example is implemented with vanilla JS.

# shared states

|name| wc scope| publication type| publication description |
|---:|:-------:|:---------------:|:------------|
|service| <app-shell>| service object | service provided by the app-shell to all children for accessing file to download (mock service). It is published just once.|
|completion-levels| <app-shell>| data | Array of data structures describing file and download completion. Each update represents a new state for the whole dialog |
|percent| <progress-bar>| data stream | number stream representing completion of single progress bar| 
