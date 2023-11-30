import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mboumApiKey = process.env.MBOUM_API_KEY;

// Load Swagger documents
const stockSearchSwaggerDocument = YAML.load('../swagger/stock_search.yaml');
const latestNewsSwaggerDocument = YAML.load('../swagger/latest_news.yaml');
const historicalDataSwaggerDocument = YAML.load('../swagger/historical_data.yaml');
const moduleDataSwaggerDocument = YAML.load('../swagger/module_data.yaml');
const newsBySymbolSwaggerDocument = YAML.load('../swagger/news_by_symbol.yaml');
const quotesSwaggerDocument = YAML.load('../swagger/quotes.yaml');
const secForm4SwaggerDocument = YAML.load('../swagger/sec_form4.yaml');
const stockSearchSwaggerDocument = YAML.load('../swagger/stock_search.yaml');

// Serve Swagger UI for each API documentation
app.use('/api-docs/stock-search', swaggerUi.serve, swaggerUi.setup(stockSearchSwaggerDocument));
app.use('/api-docs/latest-news', swaggerUi.serve, swaggerUi.setup(latestNewsSwaggerDocument));
app.use('/api-docs/historical-data', swaggerUi.serve, swaggerUi.setup(historicalDataSwaggerDocument));
app.use('/api-docs/module-data', swaggerUi.serve, swaggerUi.setup(moduleDataSwaggerDocument));
app.use('/api-docs/news-by-symbol', swaggerUi.serve, swaggerUi.setup(newsBySymbolSwaggerDocument));
app.use('/api-docs/quotes', swaggerUi.serve, swaggerUi.setup(quotesSwaggerDocument));
app.use('/api-docs/sec-form4', swaggerUi.serve, swaggerUi.setup(secForm4SwaggerDocument));



// Function to handle requests to Mboum Finance API
async function getMboumFinanceData(url: string, params = {}) {
    try {
        const response = await axios.get(url, {
            headers: {
                'X-RapidAPI-Key': mboumApiKey,
                'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
            },
            params
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}`);
        } else if (error instanceof Error) {
            throw new Error(`General error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

// Route for stock search
app.get('/api/finance/search', async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string; // Assuming a query parameter named 'query'
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/sc/search/' + query);
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

// Route for latest news
app.get('/api/finance/news', async (req: Request, res: Response) => {
    try {
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/ne/news');
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

// Route for SEC Form 4 filings
app.get('/api/finance/form4', async (req: Request, res: Response) => {
    try {
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/v1/sec/form4');
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

// Route for quotes
app.get('/api/finance/quote', async (req: Request, res: Response) => {
    try {
        const symbol = req.query.symbol as string;
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/qu/quote', { symbol });
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

// Route for news by symbol
app.get('/api/finance/news/symbol', async (req: Request, res: Response) => {
    try {
        const symbol = req.query.symbol as string;
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/ne/news/', { symbol });
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

// Route for module data
app.get('/api/finance/module', async (req: Request, res: Response) => {
    try {
        const symbol = req.query.symbol as string;
        const module = req.query.module as string;
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/mo/module/', { symbol, module });
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

// Route for historical data
app.get('/api/finance/history', async (req: Request, res: Response) => {
    try {
        const symbol = req.query.symbol as string;
        const interval = req.query.interval as string;
        const diffandsplits = req.query.diffandsplits as string;
        const data = await getMboumFinanceData('https://mboum-finance.p.rapidapi.com/hi/history', { symbol, interval, diffandsplits });
        res.json(data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Error');
    }
});

app.listen(port, () => {
    console.log(`DataHarbor API listening at http://localhost:${port}`);
});

