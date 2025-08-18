import "./Header.css";

type HeaderProps = {
    lastUpdatedDate?: string
}

const Header: React.FC<HeaderProps> = ({ lastUpdatedDate }) => {
    return (
        <div className="headerContainer">
            <h1 className="title">Fed Funds to Mortgages</h1>
            <p className="subtitle">An Empirical OLS Study of the Monetary Policy Transmission Mechanism</p>
            <div className="updateContainer">
                {
                    lastUpdatedDate ? (
                        <p className="updateText">Change the Federal Funds Rate and see what happens! Last updated {lastUpdatedDate}</p>
                    ): (
                        <>
                            <div className="spinner"/>
                            <p className="updateText">Loading data</p>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Header;