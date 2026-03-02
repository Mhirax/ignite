import react from "react";
//Animation
import styled from "styled-components";
import { motion } from "framer-motion";


const Nav = () => {
    return (
        <StyledNav>
            <Logo>
                {/* <img src={} alt="logo"/> */}
            </Logo>
            <div className="search">
                <input type="text" />
                <button>Search</button>
            </div>
        </StyledNav>

    );
}

const StyledNav = styled(motion.nav)`

`

const Logo = styled(motion.div)`

`
export default Nav;