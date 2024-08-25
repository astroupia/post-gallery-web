import PaymentState from "@/apps/core/application/state/paymentState";
import ConfirmPaymentViewModel from "@/apps/core/application/viewmodels/paymentViewModel";
import { OrderStatus } from "@/apps/core/data/models/order";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { AsyncStatus } from "@/lib/state/asyncState";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import menu from '@/assets/unsuccesfull.png'

interface PaymentViewProps{

	orderId: string

}

export default class PaymentView extends ViewModelView<ConfirmPaymentViewModel, PaymentViewProps, PaymentState>{
	
	onCreateViewModel(state: PaymentState): ConfirmPaymentViewModel {
		return new ConfirmPaymentViewModel(state, this.setState.bind(this));
	}
	
	onCreateState(): PaymentState {
		return new PaymentState(this.props.orderId);
	}

	onCreateMain(): ReactNode {
		if([OrderStatus.complete, OrderStatus.waitingShipment].includes(this.state.order!.status)){
			return <h1>Payment Complete</h1>
		}
		return (
			<div>
			<div className="flex flex-col w-full h-screen justify-center items-center max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16">
				<img className='w-20' src={menu} />
				<p className='py-4 font-Lato text-4xl'>Payement Completed</p>
				<p className='font-Lato text-4xl'></p>
				<a href="/" className="h-14 flex justify-center items-center mt-20 bg-black rounded-3xl">	
					<div className="font-medium text-2xl px-14 text-center text-white" >Go Back</div>
				</a>
			</div>
		</div>
		)
	}


}


export function RoutedPaymentView(){
	let params = useParams()
	return <PaymentView orderId={params.orderId!}/>
}