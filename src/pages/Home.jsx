import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { features } from "../contents/Features";
import { Page } from "../layout/Page";

export const Home = () => {

    const navigate = useNavigate();

    return (
        <Page className="d-flex flex-column">
            <PageHeader
                title="Applications"
                subTitle="Choose a section below to manage system features"
                noMenu
            />
            <hr></hr>
            <div className="user-select-none h-100">
                <div className="row g-4">
                    {features.map((feature, i) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                            <div
                                onClick={()=>navigate(feature.route)}
                                className={`border rounded-4 p-4 h-100 text-dark text-center ${feature?.disabled ? 'opacity-50' : 'as-btn'}`}
                            >
                                <div className="mb-3" style={{ fontSize: "2rem" }}>{feature.icon}</div>
                                <h6>{feature.title}</h6>
                                <p className="mb-0">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
};
