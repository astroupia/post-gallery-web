import Request from "@/lib/network/Request";
import { ChapaPaymentResponse, ChapaPaymentRequestForm } from "../models/paymentResponse";


export class ChapaPaymentRequest extends Request<ChapaPaymentResponse>{

	constructor(
		form: ChapaPaymentRequestForm
	){
		super({
			url: "/payment/chapa/pay/",
			method: "POST",
			data: {
				"email": form.email,
				"amount": form.amount,
				"first_name": form.firstName,
				"last_name": form.lastName,
				"return_url": form.returnUrl
			}
		})
	}

	deserializeResponse(response: any): ChapaPaymentResponse {
		return {
			checkoutUrl: response.data["checkout_url"],
			transactionId: response.data["tx_ref"]
		};
	}

}



export class ChapaVerifyRequest extends Request<boolean>{
	
	constructor(transactionId: string){
		super({
			url: "/payment/chapa/verify/",
			method: "GET",
			params: {
				"tx_ref": transactionId
			}
		});
	}

	deserializeResponse(response: any): boolean {
		return response.data.is_paid
	}
}