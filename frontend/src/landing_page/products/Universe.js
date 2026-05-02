import React from "react";

const partners = [
  { logo: "media/images/smallcaseLogo.png", title: "Thematic investment platform" },
  { logo: "media/images/smallcaseLogo.png", title: "Thematic investment platform" },
  { logo: "media/images/smallcaseLogo.png", title: "Thematic investment platform" },
  { logo: "media/images/smallcaseLogo.png", title: "Thematic investment platform" },
  { logo: "media/images/smallcaseLogo.png", title: "Thematic investment platform" },
  { logo: "media/images/smallcaseLogo.png", title: "Thematic investment platform" },
];

function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>The Zerodha Universe</h1>
        <p>Extend your trading and investment experience even further with our partner platforms</p>

        <div className="row mt-5">
          {partners.map((partner, index) => (
            <div key={index} className="col-md-4 col-sm-6 text-center p-3">
              <img src={partner.logo} alt={partner.title} className="img-fluid mb-2" />
              <p className="text-small text-muted">{partner.title}</p>
            </div>
          ))}
        </div>

        <button className="btn btn-primary fs-5 mt-4 w-25 d-block mx-auto">
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
