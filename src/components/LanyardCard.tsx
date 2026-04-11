import { motion } from "framer-motion";
import "./LanyardCard.css";

const LanyardCard = () => {
    const companyLogoUrl = "https://images.yourstory.com/cs/images/companies/harveetechlogo-gomathi45671-1763037408615.png?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=256&q=75";

    return (
        <div className="lanyard-scene" aria-label="Full Stack Developer role card">
            <div className="lanyard-anchor" />
            <div className="lanyard-strap" />

            <motion.article
                className="lanyard-card"
                initial={{ rotate: -3, y: -6 }}
                animate={{ rotate: [0, 2, -2, 1, 0], y: [0, 2, -1, 1, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ rotate: 0, y: -2, scale: 1.01 }}
            >
                <div className="lanyard-card-top">
                    <div>
                        <span className="lanyard-brand">Harvee Technologies</span>
                        <span className="lanyard-subtitle">Current Role</span>
                    </div>
                </div>

                <div className="lanyard-card-body">
                    <img src={companyLogoUrl} alt="Harvee Technologies logo" className="lanyard-company-logo" loading="lazy" />
                    <h3>Full Stack Developer</h3>
                    <p className="lanyard-team">SaaS Product Team</p>
                    <p className="lanyard-description">
                        Working on building and scaling SaaS applications by developing end-to-end features, from responsive user
                        interfaces to robust backend services.
                    </p>
                </div>
            </motion.article>
        </div>
    );
};

export default LanyardCard;
