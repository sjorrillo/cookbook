import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="page-footer white">
            <div className="footer-copyright">
                <div className="grey-text center-align">
                    © Copyright {year} Cookbook
                </div>
            </div>
        </footer>
    );
};

export default Footer;