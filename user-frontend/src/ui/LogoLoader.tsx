export default function LogoLoader() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            background: "#fff"
        }}>
            <style>{`
                @keyframes logoPulse {
                    0%   { transform: scale(1);    opacity: 1; }
                    50%  { transform: scale(1.12); opacity: 0.75; }
                    100% { transform: scale(1);    opacity: 1; }
                }
                @keyframes ringGrow {
                    0%   { transform: scale(0.85); opacity: 0.6; }
                    100% { transform: scale(1.4);  opacity: 0; }
                }
                .logo-loader-img {
                    animation: logoPulse 1.4s ease-in-out infinite;
                    border-radius: 22%;
                }
                .logo-loader-ring {
                    position: absolute;
                    width: 110px;
                    height: 110px;
                    border-radius: 22%;
                    border: 3px solid #6633CC;
                    animation: ringGrow 1.4s ease-out infinite;
                }
            `}</style>
            <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="logo-loader-ring" />
                <img
                    src="/brand-icon.png"
                    alt="Loading"
                    width={90}
                    height={90}
                    className="logo-loader-img"
                    style={{ objectFit: "contain" }}
                />
            </div>
        </div>
    );
}
