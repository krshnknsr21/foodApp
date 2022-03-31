import classes from "./Footer.module.css";
import SocialFollow from "./SocialFollow";

export default function Footer() {
  return (
    <div className="App">
      <footer>
        <div className={classes.branch}>
          <h2>Our Locations</h2>
          <div className={classes.branch_list}>
            <span>Thane</span>
            <span>Mulund</span>
            <span>Kurla</span>
            <span>Dadar</span>
            <span>Chembur</span>
            <span>Ghatkopar</span>
            <span>Sion</span>
            <span>Vikhroli</span>
            <span>Bandra</span>
          </div>
        </div>
        <div className={classes.lower}>
          <section className={classes.about}>
            <h2>About</h2>
            <p className="text-justify">
              Our website <i>FOOD FRENZY</i> is an initiative to help the local
              food vendors with an online presence. <i>FOOD FRENZY</i> which
              focuses on providing the most stylish, simple to use and
              interactive website so as the provide the best user experience.
            </p>
          </section>
          <section className={classes.socials}>
            <h2>We are Social</h2>
            <SocialFollow />
          </section>
        </div>
      </footer>
    </div>
  );
}
