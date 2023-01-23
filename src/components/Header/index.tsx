import { NavLink } from 'react-router-dom'
import { Scroll, Timer } from 'phosphor-react'

import { HeaderContainer } from './styles'

import LogoSVG from '../../assets/Logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoSVG} alt="Dois triângulos verdes um encima do outro." />
      <nav>
        <NavLink to="/" title="Time">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
