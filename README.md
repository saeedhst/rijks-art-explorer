# Rijksmuseum Art Explorer

This application allows users to explore and discover artworks from the Rijksmuseum's collection through a dynamic and intuitive interface.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Features

### Advanced Search
- **Advanced Search Button**: Users can perform searches using specific parameters.
- **Persistent Results**: After performing a search, users can refresh the page without losing their search results.
- **Search Result Management**: Users can view active filters tags below the main search box. They can also remove active search tags or clear the main search input box to update their search results.
- **No Results Handling**: If no search results are found, a message will be displayed. Users can click on "Clear your filters" to reset the search.

### Search Results
- **Load More**: At the end of the list, users can click the "Load More" button to fetch additional items.
- **Image Availability**: Items without images do not have a details page. Clicking on these items will show a notification and prevent them from going to the details page.

### Details Page
- **Art Information**: Displays detailed information about the selected artwork, including a large, full image.
- **Artist Search**: Users can search for more items from the artist for the current item by clicking on the name of the artist.
- **Color-Based Search**: A section at the bottom allows users to view images that match the average color of the current artwork.

### Navigation
- **Home Navigation**: Clicking on the "RIJKS MUSEUM" title will always return users to the main screen and reset all settings and search parameters.
- **Back Button**: Clicking on the back button on the browser will take the user to the previous search results page with all the filters and queries preserved.

## Technologies Used
- **Frontend**: The frontend application is built using Angular 18.
- **Backend Relay Server**: Backend application is built with ExpressJS and uses axios.
- **State Management**: RxJS is used for state management and communication between components.
- **API Integration**: Backend handles requests to the Rijksmuseum API with the API-Key parameter.
- **Libraries Used**: RxJS, ReactiveForms, Angular Material, ExpressJS, Axios, and concurrently.

## Getting Started

To run this application locally, follow these steps:

### Run the Backend and Frontend with one command:
```bash
npm start
```

### You can also run them separately using:
```bash
npm run backend;
npm run frontend;
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
