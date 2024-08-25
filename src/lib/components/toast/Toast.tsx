import React from "react";


interface ToastProps{
	color: string
	message: string
}

interface ToastState{
	visible: boolean
}

export default class Toast extends React.Component<ToastProps, ToastState>{


	constructor(props: ToastProps){
		super(props)
		this.state = {
			visible: true
		}
	}

	componentDidMount(): void {
		// this.setState({visible: true})
		// setTimeout(() => {this.setState({visible: false})}, 5000)
	}

	render(): React.ReactNode {
		return <div className={`bg-${this.props.color} py-3 px-5 text-white rounded-lg w-full ${(!this.state.visible)?'invisible':''}`}>{this.props.message}</div>
	}

}