# Cracked Up

Welcome to Cracked Up! This project is a monorepo encompassing a conglomerate of tools for adoptable online hatching games.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Cracked Up is a mobile-friendly, comprehensive tool and resource hub for multiple adoptable dragon-hatching games. Currently includes tools for [Dragon Cave](https://dragcave.net/) and Dragon Village Collection. This monorepo includes the frontend and backend projects required for both games. Tools for additional games may be added in the future.

### Dragon Cave Hatchery

Cracked Up Hatchery is a tool for the browser-based adoptable site [Dragon Cave](https://dragcave.net) and will enable users to manage their eggs, trade views, unique views, and clicks with other users which are required for hatching dragons and growing hatchlings. The system will be designed around Dragon Cave's API, allowing for accurate account management, login functionality via Dragon Cave OAuth, and data acquisition that is complient with Dragon Cave creator, TJ09's site ToS and HTML scraping boundaries.

### Dragon Village View Trader

The Dragon Village View Trader is a tool for the mobile dragon-hatching game, Dragon Village Collection, and allows users to submit, view, set, and track the progress of unique views on their eggs and hatchlings. A certain number of unique views are required to unlock special dragon personalities and in-game achievements. To encourage users to contribute to the view trading system, they will be required to click a specified number of links before being able to submit each of their own links. 

## Features

### Dragon Cave

- Manage Dragon Cave eggs and hatchlings
- Click and view other user's eggs and hatchlings in an iFrame viewer
- Integration with Dragon Cave API and Dragon Cave OAuth
- Future features to be determined based on Dragon Cave's API capabilities

### Dragon Village Collection

- Submit Dragon Village egg and hatchling links after contributing specified number of clicks
- Track view counts and progress towards view goals
- Click and view egg details in an iframe viewer

## Installation

### Prerequisites

- Node.js
- Ruby
- Rails
- PostgreSQL

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ari-flowers/crackedup-hatchery.git
    cd crackedup-hatchery
    ```

2. Install dependencies for the frontend:
    ```sh
    cd crackedup-UI
    npm install
    ```

3. Install dependencies for the backend:
    ```sh
    cd ../crackedup-backend
    bundle install
    ```

4. Set up the database:
    ```sh
    rails db:create
    rails db:migrate
    ```

## Usage

### Running the Development Servers

1. Start the backend server:
    ```sh
    cd crackedup-backend
    rails server
    ```

2. Start the frontend server:
    ```sh
    cd ../crackedup-UI
    npm start
    ```

### Accessing the Application

- Open your browser and navigate to `http://localhost:3000` for the backend.
- The frontend can be accessed at `http://localhost:3001`.

## API Documentation

### Dragon Village API

#### Endpoints

- `GET /api/dragon_village_eggs`: Retrieve all Dragon Village eggs.
- `POST /api/dragon_village_eggs`: Submit a new Dragon Village egg.
- `DELETE /api/dragon_village_eggs/destroy_by_link`: Delete a Dragon Village egg by its share link.

### Dragon Cave API

_To be added once the Dragon Cave backend API is implemented._

## Contributing

_To be determined after launch._


## License

_TBD_
