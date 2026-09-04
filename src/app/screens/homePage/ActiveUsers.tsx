import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

/** HARDCODED RIDERS (shown when no members come back from the server) **/
const demoRiders = [
  { id: "demo-1", nick: "Ji-ho Park", role: "Track Day Lead", ride: "CBR1000RR-R", gradient: "linear-gradient(135deg, #d92b2b, #6d0f0f)" },
  { id: "demo-2", nick: "Seo-yeon Kim", role: "Canyon Rider", ride: "Ducati V4 S", gradient: "linear-gradient(135deg, #f0932b, #7a3d05)" },
  { id: "demo-3", nick: "Min-jun Lee", role: "Street Tester", ride: "ZX-10R", gradient: "linear-gradient(135deg, #2b6fd9, #0d2b5e)" },
  { id: "demo-4", nick: "Ha-eun Choi", role: "Gear Reviewer", ride: "Yamaha R7", gradient: "linear-gradient(135deg, #1f9e6b, #0a3d29)" },
];

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className={"top-riders-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className="section-head">
            <span className="section-eyebrow">Meet the crew</span>
            <span className="category-title">
              Apex <span>riders</span>
            </span>
          </Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <Card key={member._id} variant="outlined" className={"card"}>
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={imagePath} alt={member.memberNick} />
                      </AspectRatio>
                    </CardOverflow>
                    <div className={"rider-info"}>
                      <div className={"member-nickname"}>
                        {member.memberNick}
                      </div>
                      <div className={"member-role"}>{member.memberType}</div>
                    </div>
                  </Card>
                );
              })}
              {/* pad out with hardcoded riders so a thin real list doesn't leave the row half-empty */}
              {demoRiders.slice(0, Math.max(0, 4 - topUsers.length)).map((rider) => (
                <Card key={rider.id} variant="outlined" className={"card"}>
                  <CardOverflow>
                    <AspectRatio ratio="1">
                      <Box
                        className={"rider-avatar"}
                        sx={{ background: rider.gradient }}
                      >
                        <span>{rider.nick.charAt(0)}</span>
                      </Box>
                    </AspectRatio>
                  </CardOverflow>
                  <div className={"rider-info"}>
                    <div className={"member-nickname"}>{rider.nick}</div>
                    <div className={"member-role"}>{rider.role}</div>
                    <div className={"member-ride"}>{rider.ride}</div>
                  </div>
                </Card>
              ))}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
