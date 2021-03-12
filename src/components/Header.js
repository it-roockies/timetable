import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from "carbon-components-react";
import { Link } from "react-router-dom";

function TimeTableHeader({ children }) {
  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Time Table">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName element={Link} to="/" prefix="Time">
                Table
              </HeaderName>
              <HeaderNavigation aria-label="Time Table">
                <HeaderMenuItem isCurrentPage element={Link} to="/">
                  Table
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/import/">
                  Import
                </HeaderMenuItem>
              </HeaderNavigation>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem element={Link} to="/">
                      Table
                    </HeaderMenuItem>
                    <HeaderMenuItem element={Link} to="/import/">
                      Import
                    </HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
            </Header>
            <Content>{children}</Content>
          </>
        )}
      />
    </>
  );
}

export default TimeTableHeader;
