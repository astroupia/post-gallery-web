import Request from "@/lib/network/Request";



export default class SendEmailRequest extends Request<void>{

	constructor(
		to: string,
		subject: string,
		message: string,
	){
		super({
			url: "/mail/send-mail/",
			data: {
				to: to,
				subject: subject,
				message: message
			},
			method: "POST"
		});
	}

}