import NetworkApi from "@/lib/network/NetworkApi"
import CoreProviders from "../../di/coreproviders"
import SendEmailRequest from "../requests/mailRequests";
import Order from "../models/order";



export default class EmailRepository{

	private api: NetworkApi = CoreProviders.provideApiClient();

	public async sendEmail(
		to: string,
		subject: string,
		message: string
	){
		await this.api.execute(new SendEmailRequest(to, subject, message));
	}

	public async sendInquiryAcceptedEmail(to: string, clientName: string, artworkName: string, link: string){
		await this.sendEmail(
			to, 
			`Inquiry for ${artworkName}`,
			`
Hi ${clientName},

Your inquiry for ${artworkName} has been accepted. The artwork is now available for purchase.

You can view the artwork here: ${link.replaceAll(" ", "%20")}

If you have any questions, please contact us at info@post-gallery.com.

Thank you for your interest in our artwork.

Sincerely,
POST GALLERY
`
		)
	}

	public async sendRequestAcceptedEmail(to: string, clientName: string, purchaseLink: string){
		await this.sendEmail(
			to,
			"Art Purchase Request Accepted",
			`Dear ${clientName},
			Congratulations! Your art purchase request has been accepted. The exquisite artwork you selected
			is now ready for purchase.
			To complete the purchase, please follow this link: ${purchaseLink}
			If you encounter any issues or have additional queries, don't hesitate to contact us at sales@post-
			gallery.com.
			Best regards,
			The Post Gallery Team`
		);
	}

	public async sendRequestRejectedEmail(to: string, clientName: string){
		await this.sendEmail(
			to,
			"Art Purchase Request Rejected",
			`Dear ${clientName},
			We appreciate your interest in our artwork. However, we regret to inform you that we do not
			provide delivery services to your area at the moment.
			We sincerely apologize for any inconvenience caused. Feel free to explore other artworks on our
			website, and if you have any questions, please contact us at support@post-gallery.com.
			Best regards,
			The Post Gallery Team`
		)

	}
} 