/**
 * APEX MOTO — design for src/app/components/auth/index.tsx
 *
 * Login / signup modals. Handlers, MemberService calls and the props
 * interface are the original ones; the modal becomes a dark two-pane
 * card: bike photo on the left, form on the right.
 *
 * Styling lives in css/app.css (.auth-modal-* rules) rather than in
 * makeStyles, so you can restyle it without touching this file.
 */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Stack } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    /* the visual styling is in css/app.css under .auth-modal-paper —
       keeping it there means no theme colours are hard-coded here */
    outline: "none",
  },
}));

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);
      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };
      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);
      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };
      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* ---------------- SIGNUP ---------------- */}
      <Modal
        aria-labelledby="signup-modal-title"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Stack className={`${classes.paper} auth-modal-paper`} direction={"row"}>
            <div className={"auth-modal-visual"}>
              {/* swap for a local /img/moto/*.jpg once you download your own */}
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
                alt="Sport motorcycle"
              />
              <div className={"auth-modal-visual-txt"}>
                <span>Join the</span>
                <b>APEX crew</b>
              </div>
            </div>

            <div className={"auth-modal-form"}>
              <span className={"auth-eyebrow"}>Create account</span>
              <h2 className={"auth-title"}>
                Start your <span>engine</span>
              </h2>

              <div className={"auth-field"}>
                <label>Rider name</label>
                <input
                  type="text"
                  placeholder="Your username"
                  onChange={handleUsername}
                />
              </div>
              <div className={"auth-field"}>
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Your phone number"
                  onChange={handlePhone}
                />
              </div>
              <div className={"auth-field"}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                />
              </div>

              <button className={"auth-btn"} onClick={handleSignupRequest}>
                <LoginIcon sx={{ mr: 1, fontSize: 19 }} />
                Sign up
              </button>
            </div>
          </Stack>
        </Fade>
      </Modal>

      {/* ---------------- LOGIN ---------------- */}
      <Modal
        aria-labelledby="login-modal-title"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <Stack className={`${classes.paper} auth-modal-paper`} direction={"row"}>
            <div className={"auth-modal-visual"}>
              <img
                src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=900&q=80"
                alt="Sport motorcycle"
              />
              <div className={"auth-modal-visual-txt"}>
                <span>Welcome back</span>
                <b>Ride on</b>
              </div>
            </div>

            <div className={"auth-modal-form"}>
              <span className={"auth-eyebrow"}>Sign in</span>
              <h2 className={"auth-title"}>
                Back to the <span>garage</span>
              </h2>

              <div className={"auth-field"}>
                <label>Rider name</label>
                <input
                  type="text"
                  placeholder="Your username"
                  onChange={handleUsername}
                />
              </div>
              <div className={"auth-field"}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                />
              </div>

              <button className={"auth-btn"} onClick={handleLoginRequest}>
                <LoginIcon sx={{ mr: 1, fontSize: 19 }} />
                Login
              </button>
            </div>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
