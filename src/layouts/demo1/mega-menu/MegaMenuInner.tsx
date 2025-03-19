import { Fragment, useEffect, useState } from 'react';
import { useResponsive } from '@/hooks';
import { KeenIcon } from '@/components';
import { TMenuConfig, MenuItem, MenuLink, MenuTitle, MenuArrow, Menu } from '@/components/menu';
import {
  MegaMenuSubProfiles,
  MegaMenuSubAccount,
  MegaMenuSubNetwork,
  MegaMenuSubAuth,
  MegaMenuSubHelp
} from '@/partials/menu/mega-menu';
//import { useDemo1Layout } from '../Demo1LayoutProvider';
import { MENU_MEGA } from '@/config';
import { useLanguage } from '@/i18n';
import { useDemo1Layout } from '../';

const MegaMenuInner = () => {
  const desktopMode = useResponsive('up', 'lg');
  const { isRTL } = useLanguage();
  const [disabled, setDisabled] = useState(true); // Initially set disabled to true
  const { layout, sidebarMouseLeave, setMegaMenuEnabled, setMobileSidebarOpen, megaMenuEnabled } = useDemo1Layout();

  // Change disabled state to false after a certain time (e.g., 5 seconds)
  useEffect(() => {
    setDisabled(true);

    const timer = setTimeout(() => {
      setDisabled(false);
    }, 1000); // 1000 milliseconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [layout.options.sidebar.collapse, sidebarMouseLeave]);

  useEffect(() => {
    setMegaMenuEnabled(true);
  });

  const handleSidebarOpen = () => {
    setMobileSidebarOpen(true);
  };

  const build = (items: TMenuConfig) => {
    const homeItem = items[0];
    const publicProfilesItem = items[1];
    const myAccountItem = items[2];
    const networkItem = items[3];
    const authItem = items[4];
    const helpItem = items[5];

    const linkClass =
      'menu-link text-sm text-gray-700 font-medium menu-link-hover:text-primary menu-item-active:text-gray-900 menu-item-show:text-primary menu-item-here:text-gray-900';
    const titleClass = 'text-nowrap';

    return (
      <Fragment>
        <MenuItem key="home">
          <MenuLink path={homeItem.path} className={linkClass}>
            <MenuTitle className={titleClass}>{homeItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="public-profiles"
          onClick={handleSidebarOpen}>
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{publicProfilesItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>
        
        <MenuItem
          key="my-account"
          onClick={handleSidebarOpen}>
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{myAccountItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="network"
          onClick={handleSidebarOpen}>
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{networkItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="auth"
          onClick={handleSidebarOpen}>
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{authItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="help"
          onClick={handleSidebarOpen}>
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{helpItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>
      </Fragment>
    );
  };

  const buildArrow = () => {
    return (
      <MenuArrow className="flex lg:hidden text-gray-400">
        <KeenIcon icon="plus" className="text-2xs menu-item-show:hidden" />
        <KeenIcon icon="minus" className="text-2xs hidden menu-item-show:inline-flex" />
      </MenuArrow>
    );
  };

  return (
    <Menu
      multipleExpand={true}
      disabled={disabled}
      highlight={true}
      className="flex-col lg:flex-row gap-5 lg:gap-7.5 p-5 lg:p-0"
    >
      {build(MENU_MEGA)}
    </Menu>
  );
};

export { MegaMenuInner };
