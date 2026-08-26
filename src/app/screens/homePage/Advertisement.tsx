/**
 * APEX MOTO — design for src/app/screens/homePage/Advertisement.tsx
 * Replaces the restaurant ad video with a promo banner
 * (rename the file/component to Promo in your project).
 */
import { Container, Stack } from "@mui/material";

export default function Promo() {
  return (
    <div className="promo-frame">
      <Container>
        <Stack className="promo-inner">
          <span className="section-eyebrow">Limited offer</span>
          <h2 className="promo-title">
            Mid-season sale —{" "}
            <span className="text-accent">-30% on all gear</span>
          </h2>
          <p className="promo-desc">
            Helmets, leathers, gloves and boots from AGV, Alpinestars and
            Dainese. Suit up for the season while stock lasts.
          </p>
          <button className="moto-btn">Grab the deal</button>
          <span className="promo-note">Valid until August 31</span>
        </Stack>
      </Container>
    </div>
  );
}
