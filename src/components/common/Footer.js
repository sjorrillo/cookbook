import React from 'react';

export const Footer = () => {
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