import { AsyncState } from "@/lib/state/asyncState"
import LoginForm from "../forms/loginForm"

export default class LoginState extends AsyncState{

	public form: LoginForm = new LoginForm();

}