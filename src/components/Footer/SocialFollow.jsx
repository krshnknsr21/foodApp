import React from "react";
import SocialFollowCSS from "./SocialFollow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <div className={SocialFollowCSS.social_container}>
      <a
        href="https://www.youtube.com/"
        className={SocialFollowCSS.social_link}
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a
        href="https://www.facebook.com/"
        className={SocialFollowCSS.social_link}
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a
        href="https://www.twitter.com/"
        className={SocialFollowCSS.social_link}
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.instagram.com/"
        className={SocialFollowCSS.social_link}
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
}
