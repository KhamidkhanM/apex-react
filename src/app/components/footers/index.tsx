import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../../css/footer.css";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export function Footer() {
  const authMember = null;
  return (
    <Footers>
      <Container>
        <Stack direction={"row"} sx={{ mt: "94px" }}>
          <Stack direction={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"100px"} src={"/icons/burak.svg"} alt="logo" />
            </Box>
            <Box className={"foot-desc-txt"}>
              Focusing on the gourmet Turkish breakfast as well as the youth
              society, CZN Burak Gurme aims to bring Turkish cuisine back. CZN
              Burak Gurme creates an illusion with its cuisine.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt="facebook" />
              <img src={"/icons/twitter.svg"} alt="twitter" />
              <img src={"/icons/instagram.svg"} alt="instagram" />
              <img src={"/icons/youtube.svg"} alt="youtube" />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} direction={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Bo'limlar</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Stack
                  direction={"column"}
                  sx={{ mt: "20px", justifyContent: "space-between" }}
                  className={"foot-category-link"}
                >
                  <Stack direction={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Downtown, Dubai</div>
                  </Stack>
                  <Stack direction={"row"} className={"find-us"}>
                    <span>P.</span>
                    <div>+971 4 554 7777</div>
                  </Stack>
                  <Stack direction={"row"} className={"find-us"}>
                    <span>E.</span>
                    <div>devexuz@gmail.com</div>
                  </Stack>
                  <Stack direction={"row"} className={"find-us"}>
                    <span>H.</span>
                    <div>Visit 24 hours</div>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{
            border: "1px solid #C5C8C9",
            width: "100%",
            opacity: "0.2",
          }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Devex Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
