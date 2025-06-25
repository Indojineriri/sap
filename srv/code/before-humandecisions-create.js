/**
 * Automatically update the related AllocationDifficultCase status based on finalDecision when a HumanDecision is created.
 * @Before(event = { "CREATE" }, entity = "reception_autoSrv.HumanDecisions")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { AllocationDifficultCases } = cds.entities;

    // Extract the relevant data from the request
    const { allocationDifficultCases_ID, finalDecision } = request.data;

    // Check if the allocationDifficultCases_ID is defined
    if (!allocationDifficultCases_ID) {
        return;
    }

    // Determine the new status based on the finalDecision
    let newStatus;
    if (finalDecision === 'Approved') {
        newStatus = 'Resolved';
    } else if (finalDecision === 'Rejected') {
        newStatus = 'Unresolved';
    } else {
        newStatus = 'Pending Review';
    }

    // Update the AllocationDifficultCase status
    await UPDATE(AllocationDifficultCases)
        .set({ caseStatus: newStatus })
        .where({ ID: allocationDifficultCases_ID });
}
