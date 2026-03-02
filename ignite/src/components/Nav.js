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
padding: 2rem 5rem;
text-align: center;
input {
    width: 30%;
    font-size: 1rem;
    border: none;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-shadow: 0px 0px 30px rgba(224, 59, 59, 0.3);
    font-weight: bold;
    /* font-family: ; */
    
}
`;

const Logo = styled(motion.div)`

`
export default Nav;