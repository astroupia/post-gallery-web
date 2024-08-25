import LoginState from "@/apps/auth/application/states/loginState";
import SignupState from "@/apps/auth/application/states/signupState";
import LoginViewModel from "@/apps/auth/application/viewmodels/loginViewModel";
import SignUpViewModel from "@/apps/auth/application/viewmodels/signupViewModel";
import TextFieldComponent from "@/lib/components/form/TextFieldComponent";
import { AsyncStatus } from "@/lib/state/asyncState";
import React, { FormEvent } from "react";
import { Navigate } from "react-router-dom";



export default class MobileSignUpView extends React.Component<any, SignupState>{

	private viewModel: SignUpViewModel;

	constructor(props: any){
		super(props);
		this.state = new SignupState();
        this.viewModel = new SignUpViewModel(this.state, this.setState.bind(this));
        this.state.form.fullName.setValue("Enter FullName")
		this.state.form.email.setValue("Enter Email")
		this.state.form.phoneNumber.setValue("Enter Phone Number")
		this.state.form.password.setValue("Enter Password")
	}

    handleSignUpPG = (event: FormEvent) => {
		event.preventDefault();
		this.viewModel.signUpWithPG();
	}

	render(): React.ReactNode {
		if(this.state.status === AsyncStatus.done){
			return (<Navigate to="/" />)
		}
		return (
			<div className="bg-[url('./assets/LoginRegisterBG.png')] bg-center bg-cover min-h-screen w-screen text-white px-6 pt-6">
				<p className="text-6xl font-semibold">PG</p>
				<p className="text-6xl font-medium mt-8">WELCOME</p>
				<p className="text-3xl font-normal leading-6 ">TO POST GALLERY</p>
				<p className="text-xl font-light">Create your post gallery account</p>
				<p className="text-4xl font-regular py-2.5">Sign Up</p>
                <form className="" onSubmit={this.handleSignUpPG}>
						{this.state.error?.message}
						<p className="text-xl mt-2.5">Full name:</p> <TextFieldComponent field={this.state.form.fullName} syncer={this.viewModel.syncState}/>
						<p className="text-xl mt-2.5">Email:</p> <TextFieldComponent field={this.state.form.email} syncer={this.viewModel.syncState}/>
						<p className="text-xl mt-2.5">Phone Number:</p> <TextFieldComponent field={this.state.form.phoneNumber} syncer={this.viewModel.syncState}/>
						<p className="text-xl mt-2.5">Password:</p> <TextFieldComponent field={this.state.form.password} syncer={this.viewModel.syncState}/>
                        <div className="flex flex-row justify-center text-center pt-2.5">
                            <p className="text-lg font-normal text-[#E1E1E1]">I do have an account? </p>
                            <a href="/auth/login/" className="text-lg font-medium">Sign In.</a>
                        </div>
                        <button className="flex justify-center items-center w-56 m-auto mt-3 pt-2 pb-2.5 bg-white text-black rounded-full">
                            <div className="justify-center text-2xl">Continue</div>
                        </button>
				</form>
                <div className="h-16"></div>

			</div>
		)

	}



}