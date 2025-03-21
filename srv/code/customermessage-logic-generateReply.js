const cds = require('@sap/cds');
const LOG = cds.log('GenAI');
const { generateResponseTechMessage, generateResponseOtherMessage } = require('./genai/orchestration');
const { generateEmbedding } = require('./genai/embedding');

const SIMILARITY_THRESHOLD = 0.45;

/**
 * 
 * @On(event = { "Action1" }, entity = "andreAguiar_3_H03Srv.CustomerMessage")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function (request) {
	const { ID } = request.params[0] || {};
	// Check if the ID parameter is provided
	if (!ID) {
		return request.reject(400, 'ID parameter is missing.');
	}

	let customerMessage;
	try {
		// Retrieve the CustomerMessage record based on the provided ID
		customerMessage = await SELECT.one.from('andreAguiar_3_H03.CustomerMessage').where({ ID });
		if (!customerMessage) {
			throw new Error(`CustomerMessage with ID ${ID} not found.`);
		}
	} catch (error) {
		LOG.error('Failed to retrieve customer message', error.message);
		return request.reject(500, `Failed to retrieve customer message with ID ${ID}`);
	}

	const fullMessageCustomerLanguage = customerMessage.FULLMESSAGECUSTOMERLANGUAGE;
	const messageCategory = customerMessage.MESSAGECATEGORY; 
	const messageSentiment = customerMessage.MESSAGESENTIMENT;

	let resultJSON;
	if (messageCategory === 'Technical') {
		try {
			// Generate response for the technical message using the FAQ item and service order context
			resultJSON = await generateResponseTechMessage(fullMessageCustomerLanguage);
		} catch (err) {
			LOG.error('Completion service failed', err);
			return request.reject(500, 'Completion service failed');
		}
	} else {
		try {
			// Generate response for non-technical messages, including service order context
			resultJSON = await generateResponseOtherMessage(messageSentiment, fullMessageCustomerLanguage);
		} catch (err) {
			LOG.error('Completion service failed', err);
			return request.reject(500, 'Completion service failed');
		}
	}

	const { suggestedResponseCustomerLanguage, suggestedResponseEnglish } = resultJSON;
	// Ensure the generated responses are valid before updating the record
	if (!suggestedResponseCustomerLanguage || !suggestedResponseEnglish) {
		return request.reject(500, 'Completion service failed. Generated responses are invalid');
	}

	try {
		// Update the CustomerMessage with the generated responses
		await UPDATE('andreAguiar_3_H03.CustomerMessage').set({
			suggestedResponseCustomerLanguage,
			suggestedResponseEnglish,
		}).where({ ID });
		LOG.info(`CustomerMessage with ID ${ID} updated with a reply to the customer.`);
	} catch (error) {
		LOG.error('Failed to update customer message', error.message);
		return request.reject(500, `Failed to update customer message with ID ${ID}`);
	}
}