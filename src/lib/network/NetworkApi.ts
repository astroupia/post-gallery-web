import axios, {AxiosHeaders, type AxiosInstance, type AxiosRequestConfig} from "axios";
import Request from "./Request";


export default class NetworkApi{

	private client?: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl: string){
		this.baseUrl = baseUrl;
	}

	protected onCreateClient(baseUrl: string): AxiosInstance{
		return axios.create({
			baseURL: baseUrl,
		});
	}

	private getClient(): AxiosInstance{
		if(this.client === undefined){
			this.client = this.onCreateClient(this.baseUrl);
		}
		return this.client!;
	}

	async execute<T>(request: Request<T>): Promise<T>{

		let response: Object = await this.getClient()(request.config);
		
		return request.deserializeResponse(response);

	}



}