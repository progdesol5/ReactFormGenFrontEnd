import { useAuthContext } from '@/auth';
import { DefaultTooltip, KeenIcon } from '@/components';
import {
  MenuArrow,
  MenuIcon,
  MenuItem,
  MenuLink,
  MenuSeparator,
  MenuSub,
  MenuTitle
} from '@/components/menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/i18n';
import { useLayout } from '@/providers';
import { useSettings } from '@/providers/SettingsProvider';
import { toAbsoluteUrl } from '@/utils';
import { ChangeEvent, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DropdownUserLanguages } from './DropdownUserLanguages';

interface IDropdownUserProps {
  menuItemRef: any;
}
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const demos = [
  {
    name: "Demo 1",
    query: "demo1"
  }, {
    name: "Demo 2",
    query: "demo2"
  },
  {
    name: "Demo 3",
    query: "demo3"
  },
  {
    name: "Demo 4",
    query: "demo4"
  },
  {
    name: "Demo 5",
    query: "demo5"
  },
  {
    name: "Demo 6",
    query: "demo6"
  },
  {
    name: "Demo 7",
    query: "demo7"
  },
  {
    name: "Demo 8",
    query: "demo8"
  },
  {
    name: "Demo 9",
    query: "demo9"
  },
  {
    name: "Demo 10",
    query: "demo10"
  }];
const DropdownUser = ({ menuItemRef }: IDropdownUserProps) => {
  const { settings, storeSettings } = useSettings();
  const { logout } = useAuthContext();
  const { isRTL } = useLanguage();

  const handleThemeMode = (event: ChangeEvent<HTMLInputElement>) => {
    const newThemeMode = event.target.checked ? 'dark' : 'light';

    storeSettings({
      themeMode: newThemeMode
    });
  };

  const navigate = useNavigate();
  const { currentLayout, setCurrentLayout } = useLayout();
  const setQueryAndLayout = (name: string) => {
    navigate(`?demo=${name}`);
    setCurrentLayout({ ...currentLayout, name: `${name}-layout` })
  };

  const buildHeader = () => {
    return (
      <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
        <div className="flex items-center gap-2">
          <img
            className="size-9 rounded-full border-2 border-success"
            src={toAbsoluteUrl('/media/avatars/300-2.png')}
            alt=""
          />
          <div className="flex flex-col gap-1.5">
            <Link
              to="/account/hoteme/get-stard"
              className="text-sm text-gray-800 hover:text-primary font-semibold leading-none"
            >
              Cody Fisher
            </Link>
            <a
              href="mailto:c.fisher@gmail.com"
              className="text-xs text-gray-600 hover:text-primary font-medium leading-none"
            >
              c.fisher@gmail.com
            </a>
          </div>
        </div>
        <span className="badge badge-xs badge-primary badge-outline">Pro</span>
      </div>
    );
  };

  const buildMenu = () => {
    return (
      <Fragment>
        <MenuSeparator />
        <div className="flex flex-col">
          <MenuItem>
            <MenuLink path="/public-profile/profiles/default">
              <MenuIcon className="menu-icon">
                <KeenIcon icon="badge" />
              </MenuIcon>
              <MenuTitle>
                <FormattedMessage id="USER.MENU.PUBLIC_PROFILE" />
              </MenuTitle>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink path="/account/home/user-profile">
              <MenuIcon>
                <KeenIcon icon="profile-circle" />
              </MenuIcon>
              <MenuTitle>
                <FormattedMessage id="USER.MENU.MY_PROFILE" />
              </MenuTitle>
            </MenuLink>
          </MenuItem>
          <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: isRTL() ? 'left-start' : 'right-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [50, 0] : [-50, 0] // [skid, distance]
                  }
                }
              ]
            }}
          >
            <MenuLink>
              <MenuIcon>
                <KeenIcon icon="setting-2" />
              </MenuIcon>
              <MenuTitle>
                <FormattedMessage id="USER.MENU.MY_ACCOUNT" />
              </MenuTitle>
              <MenuArrow>
                <KeenIcon icon="right" className="text-3xs rtl:transform rtl:rotate-180" />
              </MenuArrow>
            </MenuLink>
            <MenuSub className="menu-default light:border-gray-300 w-[200px]] md:w-[220px]">
              <MenuItem>
                <MenuLink path="/account/home/get-started">
                  <MenuIcon>
                    <KeenIcon icon="coffee" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.GET_STARTED" />
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/home/user-profile">
                  <MenuIcon>
                    <KeenIcon icon="some-files" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.MY_PROFILE" />
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/billing/basic">
                  <MenuIcon>
                    <KeenIcon icon="icon" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.BILLING" />
                  </MenuTitle>
                  <DefaultTooltip
                    title={<FormattedMessage id="USER.MENU.PAYMENT_&_SUBSCRIPTION_INFO" />}
                    placement="top"
                    className="max-w-48"
                  >
                    <KeenIcon icon="information-2" className="text-gray-500 text-md" />
                  </DefaultTooltip>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/security/overview">
                  <MenuIcon>
                    <KeenIcon icon="medal-star" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.SECURITY" />
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/members/teams">
                  <MenuIcon>
                    <KeenIcon icon="setting" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.MEMBERS_&_ROLES" />
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/integrations">
                  <MenuIcon>
                    <KeenIcon icon="switch" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.INTEGRATIONS" />
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <MenuLink path="/account/security/overview">
                  <MenuIcon>
                    <KeenIcon icon="shield-tick" />
                  </MenuIcon>
                  <MenuTitle>
                    <FormattedMessage id="USER.MENU.NOTIFICATIONS" />
                  </MenuTitle>
                  <label className="switch switch-sm">
                    <input name="check" type="checkbox" checked onChange={() => { }} value="1" />
                  </label>
                </MenuLink>
              </MenuItem>
            </MenuSub>
          </MenuItem>
          <MenuItem>
            <MenuLink path="https://devs.keenthemes.com">
              <MenuIcon>
                <KeenIcon icon="message-programming" />
              </MenuIcon>
              <MenuTitle>
                <FormattedMessage id="USER.MENU.DEV_FORUM" />
              </MenuTitle>
            </MenuLink>
          </MenuItem>



          {/* for demos  */}

          <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: isRTL() ? 'left-start' : 'right-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [50, 0] : [-50, 0] // [skid, distance]
                  }
                }
              ]
            }}
          >
            <MenuLink>
              <MenuIcon>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </MenuIcon>
              <MenuTitle>
                <div>Layouts</div>
              </MenuTitle>
              <MenuArrow>
                <KeenIcon icon="right" className="text-3xs rtl:transform rtl:rotate-180" />
              </MenuArrow>
            </MenuLink>
            <MenuSub className="menu-default light:border-gray-300 w-[200px] md:w-[220px] md:h-72">
              <ScrollArea>
                {demos.map(demo => (
                  <MenuItem key={demo.query}>
                    <div onClick={() => setQueryAndLayout(demo.query)} className='cursor-pointer flex items-center justify-between w-full h-full p-3 hover:opacity-40 transition-opacity duration-200'>
                      <MenuIcon>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </MenuIcon>
                      <MenuTitle>
                        <div>{demo.name}</div>
                      </MenuTitle>
                    </div>
                    <MenuSeparator />
                  </MenuItem>
                ))}
              </ScrollArea>
            </MenuSub>
          </MenuItem>


          <DropdownUserLanguages menuItemRef={menuItemRef} />
          <MenuSeparator />
        </div>
      </Fragment>
    );
  };

  const buildFooter = () => {
    return (
      <div className="flex flex-col">
        <div className="menu-item mb-0.5">
          <div className="menu-link">
            <span className="menu-icon">
              <KeenIcon icon="moon" />
            </span>
            <span className="menu-title">
              <FormattedMessage id="USER.MENU.DARK_MODE" />
            </span>
            <label className="switch switch-sm">
              <input
                name="theme"
                type="checkbox"
                checked={settings.themeMode === 'dark'}
                onChange={handleThemeMode}
                value="1"
              />
            </label>
          </div>
        </div>

        <div className="menu-item px-4 py-1.5">
          <a onClick={logout} className="btn btn-sm btn-light justify-center">
            <FormattedMessage id="USER.MENU.LOGOUT" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <MenuSub
      className="menu-default light:border-gray-300 w-[200px] md:w-[250px]"
      rootClassName="p-0"
    >
      {buildHeader()}
      {buildMenu()}
      {buildFooter()}
    </MenuSub>
  );
};

export { DropdownUser };
