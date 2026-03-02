import react from "react";
//Animation
import styled from "styled-components";
import { motion } from "framer-motion";


const Nav = () => {
    return (
        <StyledNav>
            <Logo>
                {/* <img src={} alt="logo"/> */}
                <h2>IGNITE/FLARE🔥</h2>
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