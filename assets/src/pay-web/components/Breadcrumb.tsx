import * as React from "react";
import { Link } from "./Link";
import styled from "../styled-components";
import { useLocation } from "react-router-dom";

const StyledBreadcrumbs = styled.nav`
  font-size: 1.3rem;
`;

const flatMap = <X, Y>(fx: (value: X, index: number) => Y[], xs: X[]): Y[] =>
  Array.prototype.concat(...xs.map(fx));

// place a joiner between all other elements of an array
const intersperse = <X,>(joiner: (index: number) => X, items: X[]): X[] => {
  const interspersed = flatMap((item, index) => [item, joiner(index)], items);
  interspersed.pop();
  return interspersed;
};

// A link that renders as a span if it is the active route
const Breadcrumb: React.FC<{ to?: string; children: string }> = ({
  to,
  children
}) => {
  const location = useLocation();

  return !to || to === location.pathname ? (
    <span>{children}</span>
  ) : (
    <Link to={to}>{children}</Link>
  );
};

// Join together children with our caret icon
const Breadcrumbs: React.FC<{}> = ({ children }) =>
  React.Children.count(children) === 1 ? null : (
    <StyledBreadcrumbs>
      {intersperse(
        n => (
          <React.Fragment key={`caret-${n}`}>{" › "}</React.Fragment>
        ),
        React.Children.toArray(children)
      )}
    </StyledBreadcrumbs>
  );

// Add another breadcrumb to an existing set of breadcrumbs
const createCrumbs = (
  next: React.ReactNode,
  crumbs: React.ReactNode[] = []
): React.ReactNode[] => {
  return [...crumbs, next];
};

interface SettingsParams {
  service: { externalId: string };
}

interface GatewayAccountParams {
  gatewayAccount: { externalId: string };
}

interface PaymentsParams extends GatewayAccountParams {
  service: { externalId: string };
}

interface PaymentDetailParams {
  payment: { externalId: string; reference: string };
}

const Settings = (params: SettingsParams) =>
  createCrumbs(
    <Breadcrumb
      key="settings"
      to={`/console/services/${params.service.externalId}/settings`}
    >
      Settings
    </Breadcrumb>
  );

const EditServiceName = (params: SettingsParams) =>
  createCrumbs(
    <Breadcrumb
      key="edit-service-name"
      to={`/console/services/${params.service.externalId}/edit-name`}
    >
      Edit name
    </Breadcrumb>,
    Settings(params)
  );

const TeamSettings = (params: SettingsParams) =>
  createCrumbs(
    <Breadcrumb
      key="team-settings"
      to={`/console/services/${params.service.externalId}/team`}
    >
      Manage team members
    </Breadcrumb>,
    Settings(params)
  );

const GatewaySettings = (params: SettingsParams & GatewayAccountParams) =>
  createCrumbs(
    <Breadcrumb
      key="gateway-settings"
      to={`/console/services/${params.service.externalId}/gateway-accounts/${params.gatewayAccount.externalId}/credentials`}
    >
      Manage payment account
    </Breadcrumb>,
    Settings(params)
  );

const CardTypeSettings = (params: SettingsParams & GatewayAccountParams) =>
  createCrumbs(
    <Breadcrumb
      key="manage-card-types"
      to={`/console/services/${params.service.externalId}/gateway-accounts/${params.gatewayAccount.externalId}/card-types`}
    >
      Payment types
    </Breadcrumb>,
    Settings(params)
  );

const InviteTeamMember = (params: SettingsParams) =>
  createCrumbs(
    <Breadcrumb
      key="invite-team-member"
      to={`/console/services/${params.service.externalId}/team/invite`}
    >
      Invite team member
    </Breadcrumb>,
    TeamSettings(params)
  );

const Services = () =>
  createCrumbs(
    <Breadcrumb key="services" to={`/console`}>
      Services
    </Breadcrumb>
  );

const CreateService = () =>
  createCrumbs(
    <Breadcrumb key="create-service" to={`/console/services/create`}>
      Create new service
    </Breadcrumb>,
    Services()
  );

const Payments = (params: PaymentsParams) =>
  createCrumbs(
    <Breadcrumb
      key="payments"
      to={`/console/services/${params.service.externalId}/gateway-accounts/${params.gatewayAccount.externalId}/payments`}
    >
      Transactions
    </Breadcrumb>
  );

const PaymentDetail = (params: PaymentsParams & PaymentDetailParams) =>
  createCrumbs(
    <Breadcrumb
      key="payment-detail"
      to={`/console/services/${params.service.externalId}/gateway-accounts/${params.gatewayAccount.externalId}/payments/${params.payment.externalId}`}
    >
      {params.payment.reference}
    </Breadcrumb>,
    Payments(params)
  );

const RefundPayment = (params: PaymentsParams & PaymentDetailParams) =>
  createCrumbs(
    <Breadcrumb
      key="refund-payment"
      to={`/console/services/${params.service.externalId}/gateway-accounts/${params.gatewayAccount.externalId}/payments/${params.payment.externalId}/refund`}
    >
      Issue refund
    </Breadcrumb>,
    PaymentDetail(params)
  );

const BreadBox = {
  Settings,
  EditServiceName,
  TeamSettings,
  InviteTeamMember,
  Services,
  CreateService,
  Payments,
  PaymentDetail,
  RefundPayment,
  GatewaySettings,
  CardTypeSettings
};

export { Breadcrumb as default, Breadcrumbs, Breadcrumb, BreadBox };
