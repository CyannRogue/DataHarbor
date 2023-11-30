# DataHarbor

DataHarbor is a Node.js application designed to aggregate and serve a variety of financial data. It acts as a middleware, connecting to the Mboum Finance API to provide users with access to stock quotes, market news, historical data, SEC filings, and more.

## Features

- **Multiple Data Endpoints**: Access to stock search, latest news, SEC Form 4 filings, quotes, news by symbol, module data, and historical data.
- **Swagger API Documentation**: Interactive documentation for exploring API functionalities.
- **Scalable Architecture**: Built for ease of expansion and integration of additional data sources.
- **Robust Error Handling**: Comprehensive error handling for reliability and maintainability.

## Technologies

- Node.js & Express
- Axios for HTTP requests
- Swagger UI Express & YAMLjs for API documentation
- dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/DataHarbor.git
   ```
2. Navigate to the project directory:
   ```sh
   cd DataHarbor
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the necessary environment variables:
   ```
   MBOUM_API_KEY=your_mboum_api_key
   ```

### Usage

Start the server:
```sh
npm start
```

Access the API endpoints through `http://localhost:3000/` followed by the specific endpoint paths, e.g., `/api/finance/news`.

Explore the Swagger API documentation by navigating to `http://localhost:3000/api-docs`.

## Contributing

Contributions to DataHarbor are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Mboum Finance API for providing financial data.
