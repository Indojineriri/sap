/**
 * Automatically escalate cases to higher management for high priority customers based on AllocationDifficultCase status and time.
 * @After(event = { "ESCALATE" }, entity = "reception_autoSrv.AllocationDifficultCases")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
    const { Orders, Customers } = cds.entities;

    // Ensure results is an array for uniform processing
    if (!Array.isArray(results)) {
        results = [results];
    }

    for (const result of results) {
        if (!result || !result.orders_ID) continue;

        // Fetch the related order and customer information
        const order = await SELECT.one.from(Orders).where({ ID: result.orders_ID });
        if (!order || !order.customers_ID) continue;

        const customer = await SELECT.one.from(Customers).where({ ID: order.customers_ID });
        if (!customer) continue;

        // Check if the customer has a high priority level
        const isHighPriority = customer.priorityLevel >= 8; // Assuming priority level 8 or above is high

        // Check the case status and time since caseDate
        const caseStatus = result.caseStatus;
        const caseDate = new Date(result.caseDate);
        const currentDate = new Date();
        const timeDifference = (currentDate - caseDate) / (1000 * 60 * 60 * 24); // Time difference in days

        // Define conditions for escalation
        const needsEscalation = isHighPriority && caseStatus === 'Pending' && timeDifference > 7; // Pending for more than 7 days

        if (needsEscalation) {
            // Perform escalation logic, e.g., updating status or notifying management
            console.log(`Escalating case ID: ${result.ID} for high priority customer ID: ${customer.ID}`);
            // Example: Update the case status to 'Escalated'
            result.caseStatus = 'Escalated';
        }
    }
};
