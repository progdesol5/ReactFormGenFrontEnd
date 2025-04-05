import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import { TablePage, Tables } from '@/pages/tables';
import { ReactElement } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';

import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { ErrorsRouting } from '@/errors';
import { Demo1Layout } from '@/layouts/demo1';
import { Demo10Layout } from '@/layouts/demo10';
import { Demo2Layout } from '@/layouts/demo2';
import { Demo3Layout } from '@/layouts/demo3';
import { Demo4Layout } from '@/layouts/demo4';
import { Demo5Layout } from '@/layouts/demo5';
import { Demo6Layout } from '@/layouts/demo6';
import { Demo7Layout } from '@/layouts/demo7';
import { Demo8Layout } from '@/layouts/demo8';
import { Demo9Layout } from '@/layouts/demo9';
import FormGenerator from '@/pages/tables/generator/formGenerator';
import CompanyListPage from '@/pages/companies';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const AppRoutingSetup = (): ReactElement => {
  const query = useQuery();
  const currentDemo = query.get('demo') || 'demo1';

  const getDemoLayout = () => {
    switch (currentDemo) {
      case 'demo1':
        return <Demo1Layout />;
      case 'demo2':
        return <Demo2Layout />;
      case 'demo3':
        return <Demo3Layout />;
      case 'demo4':
        return <Demo4Layout />;
      case 'demo5':
        return <Demo5Layout />;
      case 'demo6':
        return <Demo6Layout />;
      case 'demo7':
        return <Demo7Layout />;
      case 'demo8':
        return <Demo8Layout />;
      case 'demo9':
        return <Demo9Layout />;
      case 'demo10':
        return <Demo10Layout />;
      default:
        return <Navigate to="/error/404" />;
    }
  };

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        {/* <Route element={<Demo1Layout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} />

          <Route path="/tables" element={<Tables />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/generated-table" element={<GenerateForm />} />

          <Route path="/public-profile/profiles/default" element={<ProfileDefaultPage />} />
          <Route path="/public-profile/profiles/creator" element={<ProfileCreatorPage />} />
          <Route path="/public-profile/profiles/company" element={<ProfileCompanyPage />} />
          <Route path="/public-profile/profiles/nft" element={<ProfileNFTPage />} />
          <Route path="/public-profile/profiles/blogger" element={<ProfileBloggerPage />} />
          <Route path="/public-profile/profiles/crm" element={<ProfileCRMPage />} />
          <Route path="/public-profile/profiles/gamer" element={<ProfileGamerPage />} />
          <Route path="/public-profile/profiles/feeds" element={<ProfileFeedsPage />} />
          <Route path="/public-profile/profiles/plain" element={<ProfilePlainPage />} />
          <Route path="/public-profile/profiles/modal" element={<ProfileModalPage />} />
          <Route path="/public-profile/projects/3-columns" element={<ProjectColumn3Page />} />
          <Route path="/public-profile/projects/2-columns" element={<ProjectColumn2Page />} />
          <Route path="/public-profile/works" element={<ProfileWorksPage />} />
          <Route path="/public-profile/teams" element={<ProfileTeamsPage />} />
          <Route path="/public-profile/network" element={<ProfileNetworkPage />} />
          <Route path="/public-profile/activity" element={<ProfileActivityPage />} />
          <Route path="/public-profile/campaigns/card" element={<CampaignsCardPage />} />
          <Route path="/public-profile/campaigns/list" element={<CampaignsListPage />} />
          <Route path="/public-profile/empty" element={<ProfileEmptyPage />} />
          <Route path="/account/home/get-started" element={<AccountGetStartedPage />} />
          <Route path="/account/home/user-profile" element={<AccountUserProfilePage />} />
          <Route path="/account/home/company-profile" element={<AccountCompanyProfilePage />} />
          <Route path="/account/home/settings-sidebar" element={<AccountSettingsSidebarPage />} />
          <Route
            path="/account/home/settings-enterprise"
            element={<AccountSettingsEnterprisePage />}
          />
          <Route path="/account/home/settings-plain" element={<AccountSettingsPlainPage />} />
          <Route path="/account/home/settings-modal" element={<AccountSettingsModalPage />} />
          <Route path="/account/billing/basic" element={<AccountBasicPage />} />
          <Route path="/account/billing/enterprise" element={<AccountEnterprisePage />} />
          <Route path="/account/billing/plans" element={<AccountPlansPage />} />
          <Route path="/account/billing/history" element={<AccountHistoryPage />} />
          <Route path="/account/security/get-started" element={<AccountSecurityGetStartedPage />} />
          <Route path="/account/security/overview" element={<AccountOverviewPage />} />
          <Route
            path="/account/security/allowed-ip-addresses"
            element={<AccountAllowedIPAddressesPage />}
          />
          <Route
            path="/account/security/privacy-settings"
            element={<AccountPrivacySettingsPage />}
          />
          <Route
            path="/account/security/device-management"
            element={<AccountDeviceManagementPage />}
          />
          <Route
            path="/account/security/backup-and-recovery"
            element={<AccountBackupAndRecoveryPage />}
          />
          <Route
            path="/account/security/current-sessions"
            element={<AccountCurrentSessionsPage />}
          />
          <Route path="/account/security/security-log" element={<AccountSecurityLogPage />} />
          <Route path="/account/members/team-starter" element={<AccountTeamsStarterPage />} />
          <Route path="/account/members/teams" element={<AccountTeamsPage />} />
          <Route path="/account/members/team-info" element={<AccountTeamInfoPage />} />
          <Route path="/account/members/members-starter" element={<AccountMembersStarterPage />} />
          <Route path="/account/members/team-members" element={<AccountTeamMembersPage />} />
          <Route path="/account/members/import-members" element={<AccountImportMembersPage />} />
          <Route path="/account/members/roles" element={<AccountRolesPage />} />
          <Route
            path="/account/members/permissions-toggle"
            element={<AccountPermissionsTogglePage />}
          />
          <Route
            path="/account/members/permissions-check"
            element={<AccountPermissionsCheckPage />}
          />
          <Route path="/account/integrations" element={<AccountIntegrationsPage />} />
          <Route path="/account/notifications" element={<AccountNotificationsPage />} />
          <Route path="/account/api-keys" element={<AccountApiKeysPage />} />
          <Route path="/account/appearance" element={<AccountAppearancePage />} />
          <Route path="/account/invite-a-friend" element={<AccountInviteAFriendPage />} />
          <Route path="/account/activity" element={<AccountActivityPage />} />
          <Route path="/network/get-started" element={<NetworkGetStartedPage />} />
          <Route path="/network/user-cards/mini-cards" element={<NetworkMiniCardsPage />} />
          <Route path="/network/user-cards/team-crew" element={<NetworkUserCardsTeamCrewPage />} />
          <Route path="/network/user-cards/author" element={<NetworkAuthorPage />} />
          <Route path="/network/user-cards/nft" element={<NetworkNFTPage />} />
          <Route path="/network/user-cards/social" element={<NetworkSocialPage />} />
          <Route path="/network/user-table/team-crew" element={<NetworkUserTableTeamCrewPage />} />
          <Route path="/network/user-table/app-roster" element={<NetworkAppRosterPage />} />
          <Route path="/network/user-table/market-authors" element={<NetworkMarketAuthorsPage />} />
          <Route path="/network/user-table/saas-users" element={<NetworkSaasUsersPage />} />
          <Route path="/network/user-table/store-clients" element={<NetworkStoreClientsPage />} />
          <Route path="/network/user-table/visitors" element={<NetworkVisitorsPage />} />
          <Route path="/auth/welcome-message" element={<AuthenticationWelcomeMessagePage />} />
          <Route
            path="/auth/account-deactivated"
            element={<AuthenticationAccountDeactivatedPage />}
          />
          <Route path="/authentication/get-started" element={<AuthenticationGetStartedPage />} />
        </Route>
        <Route path="/demo2" element={<Demo2Layout />}>
          <Route path="" element={<DefaultPage />} />
          <Route path="dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route path="tables" element={<Tables />} />
          <Route path="table" element={<TablePage />} />
          <Route path="generated-table" element={<GenerateForm />} />
        </Route>
        <Route path='/demo3' element={<Demo3Layout />}>
          <Route path="" element={<DefaultPage />} />
          <Route path="dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route path="tables" element={<Tables />} />
          <Route path="table" element={<TablePage />} />
          <Route path="generated-table" element={<GenerateForm />} />
        </Route>
        <Route path='/demo4' element={<Demo4Layout />}>
          <Route path="" element={<DefaultPage />} />
          <Route path="dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route path="tables" element={<Tables />} />
          <Route path="table" element={<TablePage />} />
          <Route path="generated-table" element={<GenerateForm />} />
        </Route> */}
        <Route element={getDemoLayout()}>
          <Route path="" element={<Navigate to="/auth/classic/login" />} />

          <Route path="/dashboard" element={<DefaultPage />} />
          <Route path="dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/companies" element={<CompanyListPage />} />
          {/* <Route path="/generated-table" element={<GenerateForm />} /> */}
          <Route path="/generated-table" element={<FormGenerator />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
