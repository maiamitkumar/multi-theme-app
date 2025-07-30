import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="w-100 mb-4">
        <img
          src="https://revelindia.in/assets/frontpage/img/photo/about_us.gif"
          alt="Modern tech company workspace"
          className="img-fluid rounded shadow-sm w-100"
          style={{ objectFit: 'cover', maxHeight: '350px' }}
        />
      </div>

      <h1>What makes Hipster hip ?</h1>
      <p>
        Hipster was founded in 2016 by Nikhil and Bok after a dinner discussion in a hawker center. Back then, they did most of the work out of an HDB flat. As a pragmatic entrepreneur, Nikhil believes that technology only makes sense when it is commercially viable. We might not always tell you what you want to hear, but we definitely problem-solve with you.
        <br />
        <br />
        Today, we have two main offices, Singapore and India. We don't follow corporate conventions such as a work dress code, but we take our work seriously.
        <br />
        <br />
        We are a team of 100+ people who are passionate about building great products. We are always looking for new challenges and opportunities to grow.
      </p>
    </div>
  );
};

export default About;