import CoreProviders from "@/apps/core/di/coreproviders";
import BaseState from "../state/baseState";
import ContextInjector from "./contextInjector";
import { FunctionalAsyncHandler } from "./asyncViewModel";
import { sleep } from "../utils/time";
import { AsyncStatus } from "../state/asyncState";


export default class ViewModel<S extends BaseState>{

	private stateSetter: Function;
	public state: S;
	private injectors: ContextInjector[];


	constructor(state: S, stateSetter: Function, injectors?: ContextInjector[]){
		this.stateSetter = stateSetter
		this.state = state;
		if(injectors === undefined){
			injectors = CoreProviders.provideDefaultInjectors()
		}
		this.injectors = injectors;
	}

	public async onInit(){
		for(let injector of this.injectors){
			await injector.inject(this.state.context, this)
		}
		await new Promise( async (resolve, reject) => {
			while(!this.isReady()){
				await sleep(100);
			}
			resolve(true);
		})
	}

	protected isReady(): boolean{
		return true;
	}

	public async initialize(){
		if(this.state.initState.status != AsyncStatus.none){
			return;
		}
		let initHandler = new FunctionalAsyncHandler<BaseState>(
			this,
			async () => {
				await this.onInit()
			},
			undefined,
			undefined,
			undefined,
			() => {
				return this.state.initState
			}
		)
		await initHandler.handle({});
	}

	public setState(state: S){
		this.stateSetter(state)
		this.state = state;
	}

	public updateAfter(callback: Function){
		callback()
		this.setState(this.state);
	}

	public syncState(){
		this.setState(this.state);
	}

}
