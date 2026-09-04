/**
 * APEX MOTO — design for src/app/screens/homePage/Statistics.tsx
 */
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">120+</Box>
            <Box className="static-text">Bikes in stock</Box>
          </Stack>
          <Divider height="64" width="2" bg="#242b38" />
          <Stack className="static-box">
            <Box className="static-num">15</Box>
            <Box className="static-text">World brands</Box>
          </Stack>
          <Divider height="64" width="2" bg="#242b38" />
          <Stack className="static-box">
            <Box className="static-num">9</Box>
            <Box className="static-text">Years on track</Box>
          </Stack>
          <Divider height="64" width="2" bg="#242b38" />
          <Stack className="static-box">
            <Box className="static-num">4.9★</Box>
            <Box className="static-text">Rider rating</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
