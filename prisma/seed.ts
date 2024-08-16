const { PrismaClient, Status } = require('@prisma/client');

const prisma = new PrismaClient();

const statuses = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

const issueTitles = [
	'Website Down',
	'App Crashing on Login',
	'Payment Gateway Error',
	'Slow Website Performance',
	'Database Connection Issue',
	'Feature Request: Dark Mode',
	'Bug: Incorrect Order Total',
	'Security Vulnerability Found',
	'API Endpoint Error',
	'User Account Locked',
	'Email Not Sent',
	'Checkout Process Issue',
	'Invalid Data in Database',
	'Missing Feature: User Profile',
	'UI Bug: Button Overlap',
	'Performance Issue: Mobile App',
	'Data Loss Incident',
	'Integration Error: Payment Provider',
	'Error Message: 404 Not Found',
	'Duplicate Records Found',
];

const issueDescriptions = [
	'Website is completely inaccessible.',
	'App crashes immediately after login.',
	'Payments are not being processed correctly.',
	'Website is loading very slowly.',
	'Database connection is intermittent.',
	'Users request a dark theme option.',
	'Order total calculation is incorrect.',
	'A potential security vulnerability has been identified.',
	'API endpoint is returning errors.',
	'User accounts are being locked unexpectedly.',
	'Emails are not being sent to users.',
	'Checkout process is not completing successfully.',
	'Invalid data has been found in the database.',
	'Users are requesting a user profile feature.',
	'Buttons are overlapping on the UI.',
	'Mobile app is experiencing performance issues.',
	'Data has been lost due to a system failure.',
	'Integration with the payment provider is failing.',
	'A 404 error is being displayed for valid pages.',
	'Duplicate records exist in the database.',
];

// const assignedToUserId = 'clzwr6rv30000l203663hu7bk';

async function createIssues() {
	for (let i = 0; i < 20; i++) {
		const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
		const randomTitleIndex = Math.floor(Math.random() * issueTitles.length);
		const randomDescriptionIndex = Math.floor(Math.random() * issueDescriptions.length);

		// const shouldAssignUserId = Math.random() < 0.5; // Randomly decide if to assign userId

		await prisma.issue.create({
			data: {
				title: issueTitles[randomTitleIndex],
				description: issueDescriptions[randomDescriptionIndex],
				status: randomStatus,
				// assignedToUserId: shouldAssignUserId ? assignedToUserId : undefined,
			},
		});
	}
}

createIssues()
	.then(() => console.log('Issues created'))
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});