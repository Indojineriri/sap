/**
 * Create automatic alerts when multiple AllocationDifficultCases for the same product occur within 24 hours.
 * @After(event = { "ALERT" }, entity = "reception_autoSrv.AllocationDifficultCases")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
  const { AllocationDifficultCases } = cds.entities;

  if (!results) return;

  const cases = Array.isArray(results) ? results : [results];

  for (const allocationCase of cases) {
    if (!allocationCase.ID || !allocationCase.caseDate) continue;

    // Calculate the 24-hour window
    const caseDate = new Date(allocationCase.caseDate);
    const startDate = new Date(caseDate.getTime() - 24 * 60 * 60 * 1000);

    // Find cases within the 24-hour window for the same product
    const similarCases = await SELECT.from(AllocationDifficultCases)
      .where({
        caseDate: { '>=': startDate, '<=': caseDate },
        shortageItems: allocationCase.shortageItems
      });

    if (similarCases.length > 1) {
      // Create an alert (this is a placeholder for the actual alert creation logic)
      console.log(`Alert: Multiple allocation difficult cases for product ${allocationCase.shortageItems} within 24 hours.`);
    }
  }
};
