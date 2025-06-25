/**
 * Automatically flag AIRecommendations for human review if confidence is below 0.70 or dataQuality is below 0.80.
 * @Before(event = { "FLAG" }, entity = "reception_autoSrv.AIRecommendations")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { AIRecommendations } = cds.entities;
    
    // Extract the data from the request
    const { confidence, dataQuality } = request.data;

    // Check if the AIRecommendation needs to be flagged for human review
    if ((confidence !== undefined && confidence < 0.70) || (dataQuality !== undefined && dataQuality < 0.80)) {
        // Set a flag or modify the request data to indicate it needs human review
        request.data.needsHumanReview = true;
    }
}
