/**
 * Automatically set aiAnalysisRequested and caseStatus based on difficultyType when a new AllocationDifficultCase is created.
 * @Before(event = { "CREATE" }, entity = "reception_autoSrv.AllocationDifficultCases")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { data } = request;
    
    if (!data) return;

    // Set default values based on difficultyType
    switch (data.difficultyType) {
        case 'High':
            data.aiAnalysisRequested = true;
            data.caseStatus = 'Pending AI Analysis';
            break;
        case 'Medium':
            data.aiAnalysisRequested = false;
            data.caseStatus = 'Review Required';
            break;
        case 'Low':
            data.aiAnalysisRequested = false;
            data.caseStatus = 'Monitor';
            break;
        default:
            data.aiAnalysisRequested = false;
            data.caseStatus = 'Undefined';
            break;
    }
};
