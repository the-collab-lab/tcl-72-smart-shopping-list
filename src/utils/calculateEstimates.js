export const calculateEstimate = (
	previousEstimate = 14, // The last estimated purchase interval
	daysSinceLastTransaction, // The number of days since the item was added to the list or last purchased
	totalPurchases, // Total number of purchases for the item
) => {
	// Not enough data if an item has been purchased 1 time,
	// just set the estimate based on when it was added to the list
	if (totalPurchases < 2) return daysSinceLastTransaction;

	// This calculates how many days should have passed based on
	// the previous estimate between purchases and the total number of purchased
	const previousFactor = previousEstimate * totalPurchases;

	// This calculates how many days should have passed based on
	// the interval between the most recent transactions
	// Subtract 1 here to exclude the current purchase in this factor
	const latestFactor = daysSinceLastTransaction * (totalPurchases - 1);

	// Divisor is used to find the average between the two factors
	// Multiplied by 2 between we will add 2 factors together
	// Subtract 1 here to lower weight of the current purchase in this factor
	const totalDivisor = totalPurchases * 2 - 1;

	//Calculate the average interval between the previous factor and the latest factor
	return Math.round((previousFactor + latestFactor) / totalDivisor);
};
