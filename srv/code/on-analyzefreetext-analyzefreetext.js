/**
 * The custom logic attached to the analyzeFreeText endpoint to store the response from the AI in AIRecommendations for a given case.
 * @On(event = { "analyzeFreeText" })
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 * @param {Function} next - Callback function to the next handler
 */
module.exports = async function(request, next) {
    const { AIRecommendations } = cds.entities;

    // Extract the caseId and AI response from the request data
    const { caseId, aiResponse } = request.data;

    // Check if caseId and aiResponse are provided
    if (!caseId || !aiResponse) {
        return request.error(400, 'Case ID and AI response are required');
    }

    // Insert the AI recommendation into the AIRecommendations entity
    await INSERT.into(AIRecommendations).columns('recommendationText', 'caseId_ID').values(aiResponse, caseId);

    // Proceed to the next handler
    return next();
}
