

export interface ChapaPaymentResponse{
	checkoutUrl: string;
	transactionId: string;
}

export interface ChapaPaymentRequestForm{
	firstName: string,
	lastName: string,
	email: string,
	amount: number,
	returnUrl: string
}