/**
 * Automatically calculate and set the confidence level based on data quality score when an AIRecommendation is created.
 * @Before(event = { "CREATE" }, entity = "reception_autoSrv.AIRecommendations")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    // Access the data from the request
    const { data } = request;

    // Check if dataQuality is defined
    if (data.dataQuality !== undefined) {
        // Calculate the confidence level based on data quality score
        // For example, let's assume the confidence level is directly proportional to the data quality
        data.confidence = data.dataQuality * 100; // Assuming dataQuality is a value between 0 and 1
    }
};
