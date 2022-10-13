const dotenv = require('dotenv');
dotenv.config();

const propertyId = process.env.GA_PROPERTY_ID; 
// Imports the Google Analytics Data API client library.
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
// const GOOGLE_APPLICATION_CREDENTIALS="credentials.json";
const analyticsDataClient = new BetaAnalyticsDataClient();

async function runRealtimeReport() {
    try {
        const [response] = await analyticsDataClient.runRealtimeReport({
            property: `properties/${propertyId}`,
            dimensions: [
            // {
            //     name: 'unifiedScreenName',
            // },
            {
                name: 'city',
            },
            ],
            metrics: [
            {
                name: 'activeUsers',
            },
            ],
        });
        console.log('Report result:');
        // console.log(response);
        response.rows.forEach(row => {
            console.log(row.dimensionValues[0], row.metricValues[0]);
        });
    } catch (error) {
        console.log("ERROR : ", JSON.stringify(error));
    }
}

runRealtimeReport();