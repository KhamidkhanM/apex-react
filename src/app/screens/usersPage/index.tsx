/**
 * APEX MOTO — design for src/app/screens/usersPage/index.tsx
 *
 * The original Burak `usersPage` was a stub and is not routed in App.tsx.
 * This is a ready-made "Riders" community screen you can wire up whenever
 * you add the route:
 *     <Route path="/riders"><UsersPage /></Route>
 *
 * It reads the existing GET /member/top-users endpoint through
 * MemberService.getTopUsers(), the same call the homepage TopRiders
 * section uses — so no backend change is required.
 */
import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import "../../../css/users.css";

export default function UsersPage() {
  const [topUsers, setTopUsers] = useState<Member[]>([]);

  useEffect(() => {
    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"users-page"}>
      <Container>
        <Stack className={"users-frame"}>
          <Box className={"users-head"}>
            <span className={"section-eyebrow"}>The paddock</span>
            <span className={"category-title"}>
              Our <span>riders</span>
            </span>
            <p className={"users-sub"}>
              The people who keep the APEX garage busy — top riders by
              activity this season.
            </p>
          </Box>

          <Stack className={"riders-grid"}>
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = member.memberImage
                  ? `${serverApi}/${member.memberImage}`
                  : "/icons/default-user.svg";
                return (
                  <Box className={"rider-card"} key={member._id}>
                    <div className={"rider-img-box"}>
                      <img src={imagePath} alt={member.memberNick} />
                    </div>
                    <span className={"rider-name"}>{member.memberNick}</span>
                    <span className={"rider-type"}>{member.memberType}</span>
                    <p className={"rider-desc"}>
                      {member.memberDesc ?? "Rides hard, talks little."}
                    </p>
                    <div className={"rider-stat"}>
                      <b>{member.memberPoints ?? 0}</b>
                      <span>points</span>
                    </div>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">No riders to show yet!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
