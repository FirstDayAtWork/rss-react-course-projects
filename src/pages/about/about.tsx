import type { JSX } from 'react';
import classes from './about.module.css';

export default function About(): JSX.Element {
  return (
    <div className={classes.about}>
      <div className={classes['about-head']}>
        <h1>About Page</h1>
        <h2>{'App for learning purposes only >:D'}</h2>
      </div>
      <footer>
        <a className={classes['footer-author-link']} href="https://github.com/FirstDayAtWork">
          Github
        </a>
        <div className={classes['footer-year']}>2025</div>
        <div className={classes['footer-logo']}></div>
        <a className={classes['footer-school-link']} href="https://rs.school/courses/reactjs">
          RS School
        </a>
      </footer>
    </div>
  );
}
