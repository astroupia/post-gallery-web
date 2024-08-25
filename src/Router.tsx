import React from "react";
import { Route, Routes } from "react-router";
import ClientSignupView from "./__mocks__/apps/auth/presentation/views/clientSignupView";
import { AuthenticationStatus } from "./apps/auth/data/repositories/authenticator";
import { EmailVerificationView } from "./__mocks__/apps/auth/presentation/views/emailVerificationView";
import AuthenticatedComponent from "./apps/auth/presentation/components/AuthenticatedComponent";
import LoginView from "./__mocks__/apps/auth/presentation/views/loginView";
import SearchView from "./__mocks__/apps/core/presentation/views/SearchView";
import { RoutedArtworkDetailView } from "./__mocks__/apps/core/presentation/views/ArtworkDetailView";
import AddArtistView from "./__mocks__/apps/admin/presentation/views/AddArtistView";
import AddArtworkView from "./__mocks__/apps/admin/presentation/views/AddArtworkView";
import AddExhibitionView from "./__mocks__/apps/admin/presentation/views/AddExhibitionView";
import ExhibitionListView from "./__mocks__/apps/core/presentation/views/ExhibitionListView";
import ExhibitionDetailView, { RoutedExhibitionDetailView } from "./__mocks__/apps/core/presentation/views/ExhibitionDetailView";
import HomeView from "./__mocks__/apps/core/presentation/views/HomeView";
import LogoutView from "./__mocks__/apps/auth/presentation/views/logoutView";
import CheckOutView, { RoutedCheckoutView } from "./__mocks__/apps/core/presentation/views/CheckoutView";
import { RoutedPaymentView } from "./__mocks__/apps/core/presentation/views/PaymentView";
import AdminLoginViewModel from "./apps/auth/application/viewmodels/adminloginViewModel";
import AdminLoginView from "./__mocks__/apps/auth/presentation/views/AdminLoginView";
import { Role } from "./apps/auth/data/models/accounts";
import DashBoardView from "./__mocks__/apps/admin/presentation/views/DashBoard/DashboardView";
import { RoutedArtistEditView } from "./__mocks__/apps/admin/presentation/views/EditArtistView";
import { RoutedEditArtworkView } from "./__mocks__/apps/admin/presentation/views/EditArtworkView";
import { RoutedEditExhibitionView } from "./__mocks__/apps/admin/presentation/views/EditExhibitionView";
import ArtistDetailView, { RoutedArtistDetailView } from "./__mocks__/apps/core/presentation/views/ArtistDetailView";
import ArtistListView from "./__mocks__/apps/core/presentation/views/ArtistListView";
import BlogListView from "./__mocks__/apps/core/presentation/views/BlogListView";
import BlogDetailView, { RoutedBlogDetailView } from "./__mocks__/apps/core/presentation/views/BlogDetailView";
import AboutView from "./__mocks__/apps/core/presentation/views/AboutView";
import ContactView from "./__mocks__/apps/core/presentation/views/ContactView";
import ComingSoon from "./__mocks__/apps/core/presentation/views/ComingSoon";
import { RoutedCartView } from "./__mocks__/apps/core/presentation/views/CartView";
import OrderDetailView, { RoutedOrderDetailView } from "./__mocks__/apps/admin/presentation/views/DashBoard/OrderDetailView";
import AddBlogPressView from "./__mocks__/apps/admin/presentation/views/AddBlogPressView";
import AddProjectFairView from "./__mocks__/apps/admin/presentation/views/AddProjectFairView";
import PublishmentListView from "./__mocks__/apps/core/presentation/views/BlogListView";
import { PublishmentType } from "./apps/core/data/models/publishment";
import ArtFairListView from "./__mocks__/apps/core/presentation/views/ArtFairListView";
import EditFairView, { RoutedEditFairView } from "./__mocks__/apps/admin/presentation/views/EditFairView";
import { RoutedEditProjectView } from "./__mocks__/apps/admin/presentation/views/EditProjectView";
import { RoutedEditBlogPressView } from "./__mocks__/apps/admin/presentation/views/EditBlogPressView";
import MobileSignUpView from "./__mocks__/apps/auth/presentation/views/mobileClientSignUpView";


export default class PGRouter extends React.Component{

	render(): React.ReactNode {

		return (
			<Routes>
				<Route path="/" element={<HomeView />} />
				<Route path="/auth/signup/" element={<ClientSignupView />}/>
				<Route path="/auth/signupMobile/" element={<MobileSignUpView />}/>
				<Route path="/auth/login/" element={<LoginView />}/>
				<Route path="/auth/logout/" element={<LogoutView />}/>
				<Route path="/admin/login/" element={<AdminLoginView/>}/>
				<Route path="/auth/email-verify/" element={
					<AuthenticatedComponent validStatus={[AuthenticationStatus.verification]} redirectionMap={new Map<AuthenticationStatus, string>([
						[AuthenticationStatus.none, "/auth/login"],
						[AuthenticationStatus.authenticated, "/"]
					])}>
						<EmailVerificationView />
					</AuthenticatedComponent>
				}/>


				<Route path="/artwork/:id" element={
					<AuthenticatedComponent>
						<RoutedArtworkDetailView/>
					</AuthenticatedComponent>
				}/>
				<Route path="/exhibitions/" element={<ExhibitionListView />}/>
				<Route path="/exhibition/:id" element={<RoutedExhibitionDetailView />}/>

				<Route path="/blogs/" element={<PublishmentListView key="blog" publishmentType={PublishmentType.blog} />}/>
				<Route path="/presses/" element={<PublishmentListView key="presses" publishmentType={PublishmentType.blog} />}/>
				<Route path="/artfairs/" element={<PublishmentListView key="projects" publishmentType={PublishmentType.project} />}/>
				<Route path="/projects/" element={<PublishmentListView key="projects" publishmentType={PublishmentType.project} />}/>
				<Route path="/publishment/:id" element={<RoutedBlogDetailView />}/>
				

				<Route path="/search" element={
					<AuthenticatedComponent>
						<SearchView/>
					</AuthenticatedComponent>
				}/>

				<Route path="/cart/:artworkId" element={
					<AuthenticatedComponent>
						<RoutedCartView />
					</AuthenticatedComponent>
				}/>

				<Route path="/checkout/:artworkId" element={
					<AuthenticatedComponent>
						<RoutedCheckoutView />
					</AuthenticatedComponent>
				}/>

				<Route path="/complete-payment/:orderId" element={
					<AuthenticatedComponent>
						<RoutedPaymentView/>
					</AuthenticatedComponent>
				}/>

				<Route path="/artist/:id" element={
					<RoutedArtistDetailView />
				}/>
				<Route path="/artists" element={
					<ArtistListView />
				}/>
				<Route path="/about" element={
					<AboutView />
				}/>
				<Route path="/contact" element={
					<ContactView />
				}/>
				<Route path="/comingsoon" element={
					<ComingSoon />
				}/>
				<Route path="/orderdetail" element={
					<OrderDetailView orderId={"PG - 00004 - OR"} />
				}/>
				

				<Route path="/admin/dashboard" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<DashBoardView/>
					</AuthenticatedComponent>
				} />

				<Route path="/admin/artist/add" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<AddArtistView/>
					</AuthenticatedComponent>
				} />

				<Route path="/admin/artist/edit/:id" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<RoutedArtistEditView />
					</AuthenticatedComponent>
				} />
				
				<Route path="/admin/artwork/add" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<AddArtworkView/>
					</AuthenticatedComponent>
				} />

				<Route path="/admin/artwork/edit/:id" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<RoutedEditArtworkView />
					</AuthenticatedComponent>
				} />
				
				<Route path="/admin/exhibition/add" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<AddExhibitionView/>
					</AuthenticatedComponent>
				} />

				<Route path="/admin/exhibition/edit/:id" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<RoutedEditExhibitionView />
					</AuthenticatedComponent>
				} />
				

				<Route path="/admin/blog-press/add" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<AddBlogPressView />
					</AuthenticatedComponent>
				} />

				<Route path="/admin/project-fair/add" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<AddProjectFairView />
					</AuthenticatedComponent>
				} />

				<Route path="/admin/blog-press/edit/:id" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<RoutedEditBlogPressView />
					</AuthenticatedComponent>
				} />

				<Route path="/admin/project/edit/:id" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<RoutedEditProjectView />
					</AuthenticatedComponent>
				} />

				<Route path="/admin/fair/edit/:id" element={
					<AuthenticatedComponent redirectTo="/admin/login" allowedRoles={[Role.admin]}>
						<RoutedEditFairView />
					</AuthenticatedComponent>
				} />

			</Routes>
		)
	}

}