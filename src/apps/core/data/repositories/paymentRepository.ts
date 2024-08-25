import CoreProviders from "../../di/coreproviders";
import { ChapaPaymentRequestForm, ChapaPaymentResponse } from "../models/paymentResponse";
import { ChapaPaymentRequest, ChapaVerifyRequest } from "../requests/paymentRequests";


export class PaymentRepository{

	private apiClient = CoreProviders.provideApiClient();

	public async chapaPayment(
		form: ChapaPaymentRequestForm
	): Promise<ChapaPaymentResponse>{
		return await this.apiClient.execute(new ChapaPaymentRequest(form));
	}

	public async chapaVerify(
		transactionId: string
	): Promise<boolean>{
		return await this.apiClient.execute(new ChapaVerifyRequest(transactionId));
	}

}