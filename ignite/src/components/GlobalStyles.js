import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 *{
margin: 0
padding: 0
box-sizing: border-box
}
html {
   &::-webkit-scrollbar{
   width: 0.5rem;
   }
   &::-webkit-scrollbar-thumb{
background-color: darkgreen;
   }
}
   body {
font-family: 'Montserrat', sans-serif;
width: 100%
   }

h1 {
font-size: 3rem;
font-family: 'Abril FatFace', cursive;
font-weight: lighter;
color: #FF7676;
}
h3 {
font-size: 1.3rem;
color: #333;
padding: 0.7rem;
}
`;



export default GlobalStyles;