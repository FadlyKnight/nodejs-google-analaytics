
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