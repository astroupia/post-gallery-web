import { Client } from "@/apps/auth/data/models/accounts";
import { PGSignupRequest } from "@/apps/auth/data/models/signupRequests";
import ClientRepository from "@/apps/auth/data/repositories/clientRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import { assert } from "chai";



class ClientRepositoryTest{

	private PGSIGNUP_REQUEST = new PGSignupRequest(
		"Jermaine Cole",
		"+251911223344",
		"jcole@dreamville.com",
		"mypassword"
	);

	private repository?: ClientRepository;

	public async setup(){
		CoreProviders.provideFirebaseApp();
		this.repository = new ClientRepository();
	}

	public async testSignUp(){
		let account: Client = await this.repository!.signUpWithPG(this.PGSIGNUP_REQUEST);
		assert.equal(account.fullName, this.PGSIGNUP_REQUEST.fullName);
	}


	async main(){
		await this.setup();
		test("Test Signup", async () => {
			await this.testSignUp()
		});
	}


}

const testCase = new ClientRepositoryTest();

beforeAll(async () => {
	await testCase.setup()
}, 100000)

test("Test Signup", async () => {
	await testCase.testSignUp()
});

