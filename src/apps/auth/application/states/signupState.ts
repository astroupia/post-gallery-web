import { AsyncState } from "@/lib/state/asyncState";
import SignupForm from "../forms/signupForm";



export default class SignupState extends AsyncState{

	public form: SignupForm = new SignupForm();

}