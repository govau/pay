import * as React from "react";
import { styledComponents, tablet } from "@pay/web";
import { Ul, NavLink } from "./components";
import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";
import { ProfileIcon } from "../../components/icons/ProfileIcon";

interface PrimaryNavProps {
  authenticated?: boolean;
  onHandleNavigate: () => void;
}

interface Props extends UserContextValues, PrimaryNavProps {}

const NavUl = styledComponents.styled(Ul)`
  width: 100%;
  display: flex;
  flex-direction: column;


  @media ${tablet} {
    flex-direction: row;

    > *:last-child{
      margin-left: auto;
    }
  }

  li:last-child {
    border-top: solid 2px ${props => props.theme.colors.white};
    border-bottom: none;

    @media ${tablet} {
      border-top: none;
    }
  }
`;

const Li = styledComponents.styled.li`
  border-bottom: solid 1px ${props => props.theme.colors.white};
  margin: 0 2rem;

  @media ${tablet} {
    border-bottom: none;
    margin: 0;
  }

  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.payHeaderBar};
  }
`;

const ProfileLink = styledComponents.styled(NavLink)`
    padding: 2.2rem 1.6rem;

    &:hover {
      ${props => `
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.payHeaderBar};
      `}
    }

    @media ${tablet} {
      padding: 1.6rem;
      margin: 0;
      border-left: solid 1px ${props => props.theme.colors.white};
      border-right: solid 1px ${props => props.theme.colors.white};
    }

    svg {
      margin-right: 0.8rem;
      overflow: visible;
      margin-top: -0.2rem;
      height: 17px;
    }
`;

const PrimaryNav: React.FC<Props> = ({
  authenticated,
  onHandleNavigate,
  user: { name }
}) => {
  if (!authenticated) {
    return null;
  }
  return (
    <NavUl>
      <Li>
        <NavLink to="/" exact onClick={onHandleNavigate}>
          Home
        </NavLink>
      </Li>
      <Li>
        <NavLink to="/console" exact onClick={onHandleNavigate}>
          Console
        </NavLink>
      </Li>
      <Li>
        <NavLink to="/platform-admin" exact onClick={onHandleNavigate}>
          Platform admin
        </NavLink>
      </Li>
      <Li>
        <NavLink to="/TODO" exact onClick={onHandleNavigate}>
          Item 2
        </NavLink>
      </Li>
      <Li>
        <NavLink to="/TODO" exact onClick={onHandleNavigate}>
          Item 3
        </NavLink>
      </Li>
      <Li>
        <ProfileLink to="/profile" exact onClick={onHandleNavigate}>
          <ProfileIcon />
          {name}
        </ProfileLink>
      </Li>
    </NavUl>
  );
};

export default withContext<PrimaryNavProps>(PrimaryNav, UserContext.Consumer);
