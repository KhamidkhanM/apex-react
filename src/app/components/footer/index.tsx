/**
 * APEX MOTO — design for src/app/components/footer/index.tsx
 * UI only: keep your own auth logic when merging.
 */
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  display: flex;
  background: #07080c;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "84px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"190px"} src={"/icons/apex-moto.svg"} alt="" />
            </Box>
            <Box className={"foot-desc-txt"}>
              APEX MOTO is a store for riders who live for the lean angle:
              supersport and naked machines, pro-level helmets, leathers and
              genuine parts — picked and tested by people who actually ride.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt="facebook" />
              <img src={"/icons/twitter.svg"} alt="twitter" />
              <img src={"/icons/instagram.svg"} alt="instagram" />
              <img src={"/icons/youtube.svg"} alt="youtube" />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Sections</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Bikes & Gear</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "24px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Toegye-ro 109, Jung-gu, Seoul</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+82 2 776 7007</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>ride@apexmoto.kr</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Mon–Sat, 10:00 – 20:00</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack className={"footer-divider"}></Stack>
        <Stack className={"copyright-txt"}>
          © {new Date().getFullYear()} APEX MOTO — ride fast, ride safe. All
          rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
